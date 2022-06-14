import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


const firebaseConfig = {
  apiKey: process.env.VUE_APP_FB_API_KEY,
  authDomain: "markdownotes.firebaseapp.com",
  projectId: "markdownotes",
  storageBucket: "markdownotes.appspot.com",
  messagingSenderId: "147926661942",
  appId: "1:147926661942:web:11712eaf2526ca374e5197"
};


firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export { firebase, auth, db };