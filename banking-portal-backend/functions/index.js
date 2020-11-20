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

app.get('/users',(req, res) =>{
    db.collection('USERS').get()
    .then(data =>{
        let ssd = [];
        data.forEach(doc=>{
            ssd.push({
                userID:doc.id,
                SSD:doc.data()});
        });
        return res.json(ssd);
    })
    .catch(err => console.error(err))
})

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
//Need to add to the database
app.post('/signup', (req, res)=>{
    const newUser = {
        email:req.body.email,
        password:req.body.password
    }

    firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
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
        if(err.code === 'auth/email-already-in-use'){
            return res.status(400).json({email:'Email is already in use'});
        }
        else{
            return res.status(500).json({error: err.code});
        }
    })
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