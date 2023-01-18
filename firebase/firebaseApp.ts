// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator, CollectionReference } from "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: process.env.APIKEY,
//     authDomain: process.env.AUTHDOMAIN,
//     databaseURL: process.env.DATAURL,
//     projectId: process.env.PROJECTID,
//     storageBucket: process.env.STORAGEBUCKET,
//     messagingSenderId: process.env.SENDERID,
//     appId: process.env.APPID
// };

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);



export { app, auth, db };