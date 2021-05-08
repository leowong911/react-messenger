import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBUxP_vnFl8oJkGuWVDGTUpJJZHCmLpP-Y",
  authDomain: "react-messenger-88358.firebaseapp.com",
  projectId: "react-messenger-88358",
  storageBucket: "react-messenger-88358.appspot.com",
  messagingSenderId: "318974867302",
  appId: "1:318974867302:web:a836711b7ff73578cabaa7",
  measurementId: "G-30Q02V5L20",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
