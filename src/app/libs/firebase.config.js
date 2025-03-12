// firebase.config.js
import { initializeApp } from "firebase/app";
// Your Firebase web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRSBVTvbCVmvGQGPZQb57QRwq3SjtRQcM",
  authDomain: "college-booking-app-435a5.firebaseapp.com",
  projectId: "college-booking-app-435a5",
  storageBucket: "college-booking-app-435a5.firebasestorage.app",
  messagingSenderId: "152160512368",
  appId: "1:152160512368:web:8c231a0074051abab2c7b5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
