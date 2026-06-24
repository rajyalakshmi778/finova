// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPRTJCwzEczuaDJpl3s5BfaB8O6QYh-wk",
  authDomain: "finova-9d3d8.firebaseapp.com",
  projectId: "finova-9d3d8",
  storageBucket: "finova-9d3d8.firebasestorage.app",
  messagingSenderId: "55775039478",
  appId: "1:55775039478:web:6a265839a348d5dc2501d7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;