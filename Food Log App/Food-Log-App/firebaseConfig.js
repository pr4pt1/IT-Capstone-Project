import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAWmLq5lCOOFkIjfSkrAcaxBMbJu86vgc",
  authDomain: "food-log-app-5f7f6.firebaseapp.com",
  projectId: "food-log-app-5f7f6",
  storageBucket: "food-log-app-5f7f6.firebasestorage.app",
  messagingSenderId: "900787538396",
  appId: "1:900787538396:web:487f34113532f5c867e719",
  measurementId: "G-7LYVZGVQPY"
};

const app = initializeApp(firebaseConfig);

export default app;