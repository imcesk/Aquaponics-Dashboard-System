import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBQGHP_eYJmWcAiEtr-WKiXcoCv1zUxwXk",
  authDomain: "aquaponics-dashboard.firebaseapp.com",
  databaseURL: "https://aquaponics-dashboard-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "aquaponics-dashboard",
  storageBucket: "aquaponics-dashboard.firebasestorage.app",
  messagingSenderId: "146679134791",
  appId: "1:146679134791:web:daf58943ce4cdc50610f62",
  measurementId: "G-S3VETTRH7V"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);