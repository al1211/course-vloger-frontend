// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_KEY ,
  authDomain: "loginvirtual-a819f.firebaseapp.com",
  projectId: "loginvirtual-a819f",
  storageBucket: "loginvirtual-a819f.firebasestorage.app",
  messagingSenderId: "665086989891",
  appId: "1:665086989891:web:694a6305a8df046ea166f6"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


const auth=getAuth(app);
const provider=new GoogleAuthProvider()

export {auth,provider}