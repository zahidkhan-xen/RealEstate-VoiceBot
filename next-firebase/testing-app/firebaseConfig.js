// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHa5Yi_p8BwZHqr7NXjAPdFsjPpRGdIIg",
  authDomain: "next-spike-2dbdf.firebaseapp.com",
  projectId: "next-spike-2dbdf",
  storageBucket: "next-spike-2dbdf.appspot.com",
  messagingSenderId: "1059581305448",
  appId: "1:1059581305448:web:3fb5949fbbf033b69351dd",
  measurementId: "G-F23L36W7QK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const analytics = getAnalytics(app);