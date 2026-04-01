import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAWmLq5lCOOFqkIjfSkrAcaxBMbJu86vgc",
  authDomain: "food-log-app-5f7f6.firebaseapp.com",
  projectId: "food-log-app-5f7f6",
  storageBucket: "food-log-app-5f7f6.appspot.com",
  messagingSenderId: "900787538396",
  appId: "1:900787538396:web:487f34113532f5c867e719",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);