// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8-TmUKPPBompU4xwE2SxTxuHYxJ6a4ew",
  authDomain: "expense-tracker-d7b07.firebaseapp.com",
  projectId: "expense-tracker-d7b07",
  storageBucket: "expense-tracker-d7b07.appspot.com",
  messagingSenderId: "77319785787",
  appId: "1:77319785787:web:fe64a4632fe0bdf46afb1e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);



// firebase login
// firebase init
// firebase deploy

