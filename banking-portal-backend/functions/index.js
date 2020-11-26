const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const app = require('express')();

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
        return db.collection(`users/${req.user.id}`).get();
    })
    .then(data => {
        req.user.email = data.docs[0].data().email;
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
          res.json({message:`document ${doc.id} has been created successfully`})
          console.log(req.body.userid)
        return db.collection('users').doc(req.body.userid).collection('CheckingAccounts').add(refenceToNewChecking)
            .then(()=>{
            console.log("This works");
             return res.status(201).json({message:"Created checking account"})
            })
            .catch((err) => {
                console.log("This failed");
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
                if(!doc.exists){
                    throw 'To account does not exist!';
                }
                toAccount.amount = doc.data().AccountBalance
                transaction.update(fromRef, {AccountBalance: fromAccount.amount - amount});
                transaction.update(toRef, {AccountBalance: toAccount.amount + amount});
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
        password:req.body.password
    }
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
            return db.doc(`/users/${userid}`).collection('CheckingAccount').add({fake:'1'}) // make a note for this later
        })
    })
    .then(()=>{
        return res.status(201).json({token})
    })
    .catch(err =>{
        console.error(err);
        if(err.code === 'auth/email-already-in-use'){
            return res.status(400).json({email:'Email is already in use'});
        }
        else{
            return res
            .status(500)
            .json({ general: "Something went wrong, please try again" });
        }
    });
})

const isEmpty = (string) =>{
    if(string.trim() === '') return true;
    else return false;
}


app.post('/login', (req, res)=>{
    const user = {
        email:req.body.email,
        password:req.body.password
    }

    let errors = {};

    if(isEmpty(user.email)) errors.email = 'Must not be empty';
    if(isEmpty(user.password)) errors.password = 'Must not be empty';

    if(Object.keys(errors).length > 0)return res.status(400).json(errors);

    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(data =>{
        return data.user.getIdToken();
    })
    .then(token =>{
        return res
        .status(201)
        .json({token});
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






exports.api = functions.https.onRequest(app);