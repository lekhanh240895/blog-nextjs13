// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6SE7e4oJ7CR7i4-ana4X2OpLimMQ250M",
  authDomain: "blog-10c66.firebaseapp.com",
  projectId: "blog-10c66",
  storageBucket: "blog-10c66.appspot.com",
  messagingSenderId: "1097392214993",
  appId: "1:1097392214993:web:b6d89871b57c72741986f0",
  measurementId: "G-J2CB9NSR0N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
