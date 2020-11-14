import firebase from "firebase/app";
import "firebase/firebase-auth"
import "firebase/firebase-firestore"

const app = firebase.initializeApp({
  apiKey: "AIzaSyADeCtcKNOi4AeH5Nt0EEA5WGjtoyDSAMw",
  authDomain: "bankingapp-4f093.firebaseapp.com",
  databaseURL: "https://bankingapp-4f093.firebaseio.com",
  projectId: "bankingapp-4f093",
  storageBucket: "bankingapp-4f093.appspot.com",
  messagingSenderId: "187835655465",
  appId: "1:187835655465:web:77849e3e9fc961b94e8338"
})

export const auth = app.auth()
export default app

  
