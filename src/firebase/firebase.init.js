// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcvjMcYRKZ8ZU8ST_8AiqzX6DFXx-HhTM",
  authDomain: "servicex-4cbd3.firebaseapp.com",
  projectId: "servicex-4cbd3",
  storageBucket: "servicex-4cbd3.firebasestorage.app",
  messagingSenderId: "728593763572",
  appId: "1:728593763572:web:7106c8c39fec9f733b62a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
