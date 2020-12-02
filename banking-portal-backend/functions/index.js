const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const app = require('express')();

const cors = require('cors');
app.use(cors());

const config = { 
    apiKey: "AIzaSyADeCtcKNOi4AeH5Nt0EEA5WGjtoyDSAMw",
    authDomain: "bankingapp-4f093.firebaseapp.com",
    databaseURL: "https://bankingapp-4f093.firebaseio.com",
    projectId: "bankingapp-4f093",
    storageBucket: "bankingapp-4f093.appspot.com",
    messagingSenderId: "187835655465",
    appId: "1:187835655465:web:77849e3e9fc961b94e8338"
}

const firebase = require('firebase');
firebase.initializeApp(config);

const db = admin.firestore();

const {
    validateSignupData,
    validateLoginData,
    reduceUserDetails,
  } = require("./util/validators.js");
const { json } = require('express');

const FBAuth = (req, res, next) => {
    let idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
      idToken = req.headers.authorization.split('Bearer ')[1];
    } 
    else {
      console.error('No token found');
      return res.status(403).json({ error: 'Unauthorized' });
    }
    admin.auth().verifyIdToken(idToken)
    .then((decodedToken) => {
        req.user = decodedToken;
        console.log("userID = " + req.user.uid)
        return db
        .collection('users')
        .where('userid', '==', req.user.uid).limit(1)
        .get();
    })
    .then((docs) => {
        docs.forEach(doc=>{
            req.user.email = doc.data().email
        })

        return next();
    })
    .catch((err) => {
        console.error('Error while verifying token ', err);
        return res.status(403).json(err);
      });
}



app.get('/users',FBAuth,(req, res) =>{
    db.collection('USERS').get()
    .then(data =>{
        let ssd = [];
        console.log(data)
        data.forEach(doc=>{
            ssd.push({
                SSD:doc.data()
            });
        });
        return res.json(ssd);
    })
    .catch(err => console.error(err))
})
//  This creates an entry into user table
app.post('/users',(req, res) =>{
    const user = {
        SSD:req.body.SSD
    }
    db.collection('USERS').
    add(user).then((doc)=>{
        res.json({message:'document ${doc.id} has been created successfully'});
    })
    .catch((err) => {
        res.status(500).json({error: 'Something went wrong'});
        console.error(err);
    })
})
// this will create a new checking account and link it to the exisiting account // doesnt work


app.get('/accounts-checking',(req, res) =>{
    let userID = req.body.userid;
    let accounts = [];
    console.log('working');
    db.collection('CheckingAccounts').where('Owner', '==', userID).get()
    .then((data)=>{
        data.forEach((doc)=>{
            accounts.push({
                AccountID:doc.id, 
                AccountBalance:doc.data().AccountBalance
            })
        })
        return res.json(accounts)
    })
    .catch(err => console.error(err))
})






app.post('/checking-account',(req, res) => {
      const newCheckingAccount = {
        AccountBalance:1000,
        Owner:req.body.userid,
      }
      const refenceToNewChecking = {
          location:''// add the doc.id to get a refernce to the
      }
      db.collection('CheckingAccounts').add(newCheckingAccount)
      .then((doc) =>{
          refenceToNewChecking.location = db.doc('CheckingAccounts/' + doc.id);
            return db.collection('users').doc(newCheckingAccount.Owner).collection('CheckingAccounts').add(refenceToNewChecking)
            .then(()=>{
            console.log("This works");
             return res.status(201).json({message:"Created checking account"})
            })
            .catch((err) => {
                console.log("This failed");
                console.log(err)
                res.status(500).json({error: 'Something went wrong'});
                return err;               
            }) ;
    }) 
      .catch((err) => {
        res.status(500).json({error: 'Something went wrong'});
        console.error(err);
    });
})

app.post('/transfer', (req, res)=>{ // works for checking accounts
    const fromAccount ={
        location:req.body.From,
        amount:0
    }
    const toAccount ={
        location:req.body.To,
        amount:0
    } 
    const amount = req.body.Amount;
    let fromRef = db.collection('CheckingAccounts').doc(fromAccount.location);
    let toRef = db.collection('CheckingAccounts').doc(toAccount.location);
    db.runTransaction( function (transaction){
        return transaction.get(fromRef)
        .then((doc) =>{
            if(!doc.exists){
                throw 'From account does not exist!';
            }
            fromAccount.amount = doc.data().AccountBalance
            if(amount > fromAccount.amount){
                throw 'Not enough money in from account'; 
            }
            return transaction.get(toRef).then((doc) =>{
                console.log(toRef)
                if(!doc.exists){
                    throw 'To account does not exist!';
                }
                toAccount.amount = doc.data().AccountBalance
                transaction.update(fromRef, {AccountBalance: parseFloat(fromAccount.amount) - parseFloat(amount)});
                transaction.update(toRef, {AccountBalance: parseFloat((toAccount.amount) + parseFloat((amount)))});
                transaction.commit();
                
            })
        })
    }).then(result => {
        console.log('Transaction success!')
        return res.status(201).json({message:"Transaction Worked"})
      }).catch(err => {
        console.log('Transaction failure: ', err)
        return res.status(500).json({error: err});
      });
})




//Need to add to the database
app.post('/signup', (req, res)=>{

    
    const newUser = {
        email:req.body.email,
        password:req.body.password,
        confirmPassword: req.body.confirmPassword
    }

    const { valid, errors } = validateSignupData(newUser);

    if (!valid) return res.status(403).json(errors);

    let token, userid;
    firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then(data =>{
        userid = data.user.uid; 
        return data.user.getIdToken();
    })
    .then((idToken) =>{
        token = idToken;
        return db.doc(`/users/${userid}`).set({ 
            email:newUser.email,
            userid:userid
        }).then(()=>{
            const newCheckingAccount = {
                AccountBalance:1000,
                Owner:userid,
              }
              const refenceToNewChecking = {
                  location:''// add the doc.id to get a refernce to the
              }
              console.log(newCheckingAccount)
              return db.collection('CheckingAccounts').add(newCheckingAccount)
              .then((doc) =>{
                  console.log(doc)
                  refenceToNewChecking.location = db.doc('CheckingAccounts/' + doc.id);
                    return db.collection('users').doc(userid).collection('CheckingAccounts').add(refenceToNewChecking)
                    .then(()=>{
                    console.log("This works");
                    })
                    .catch((err) => {
                        console.log("This failed");
                        res.status(500).json({error: 'Something went wrong'});
                        return err;               
                    }) ;
            })
        })
    .then(()=>{
        return res.status(201).json({token})
    })
    .catch(err =>{
        console.error(err);
        if(err.code === 'auth/email-already-in-use'){
            return res.status(403).json({email:'Email is already in use'});
        }
        else{
            return res
            .status(500)
            .json({ general: "Something went wrong, please try again" });
        }
    });
})

app.post('/test', (req, res)=>{
    return db.collection("users").doc('0twpGqKhgzbvzzcJJHYtfOiD2PP2').get().
    then((doc) =>{
        if(doc.exists){
            console.log(doc.data())
            
        }
        else{
            throw 'Table does not exist';
        }
    })
    .catch((err) => {console.log(err)})
})
})


app.post('/login', (req, res)=>{
    const user = {
        email:req.body.email,
        password:req.body.password
    }


    const { valid, errors } = validateLoginData(user);

    if (!valid) return res.status(400).json(errors);

    if(Object.keys(errors).length > 0)return res.status(400).json(errors);

    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(data =>{
        return data.user.getIdToken();
    })
    .then((token) =>{
        return res.json({token});
    })
    .catch(err =>{
        console.error(err);
        if(err.code === 'auth/wrong-password'|| err.code === "auth/user-not-found"){
            return res.status(403).json({general:'Wrong Credentials, please try again'});
        }
        else{
            return res.status(500).json({error: err.code});
        }
    })
})


app.get('/user' ,FBAuth, (req, res) => { // change this to email
    let email = req.user.email;
    let userID = req.user.uid;
    let accounts = [];
    db.collection('CheckingAccounts').where('Owner', '==', userID).get()
    .then((data)=>{
        data.forEach((doc)=>{
            accounts.push({
                AccountID:doc.id, 
                AccountBalance:doc.data().AccountBalance
            })
        })
        return res.json({accounts:accounts, email:email})
    })
    .catch(err => console.error(err))
  }); 

  app.post('/forgot-password', (req, res) => { // change this to email
    let email = req.body.email;
    firebase.auth().sendPasswordResetEmail(email)
    .then(()=>{
        return res.status(201).json({message:"Password Reset, Check Email"})
    })
    .catch((err) => {
        console.log("This failed");
        return res.status(500).json({error: 'Something went wrong: ' + err});
                    
    }) ;
  }); 





exports.api = functions.https.onRequest(app);