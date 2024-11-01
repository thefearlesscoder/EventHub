// Import the functions you need from the SDKs you need
import { getAuth, GoogleAuthProvider } from "@firebase/auth";
import { getApps, initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3ZvxhismkqJSj-FfO4Gh-ZtDqNLvIhdc",

  authDomain: "musicmate-a0747.firebaseapp.com",

  projectId: "musicmate-a0747",

  storageBucket: "musicmate-a0747.firebasestorage.app",

  messagingSenderId: "489788440242",

  appId: "1:489788440242:web:65ba38e806715f12bcd3ab",

  measurementId: "G-F0P1CY93ND",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
console.log(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();


