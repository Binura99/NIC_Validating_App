import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBkMGuZJrMfOXpz7WpLVTbff4U5SvvdmVc",
    authDomain: "phone-auth-93115.firebaseapp.com",
    projectId: "phone-auth-93115",
    storageBucket: "phone-auth-93115.appspot.com",
    messagingSenderId: "423482087452",
    appId: "1:423482087452:web:fe634ed5571a04512967d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service

export const authentication = getAuth(app);