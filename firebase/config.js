// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCrjld9ymM828Xm0X1Rk8mSBKFQxPQFV50",
  authDomain: "rn-hw-19370.firebaseapp.com",
  databaseURL:
    "https://rn-hw-19370-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "rn-hw-19370",
  storageBucket: "rn-hw-19370.appspot.com",
  messagingSenderId: "1027063642897",
  appId: "1:1027063642897:web:b6587ddc34625303256ab0",
  measurementId: "G-9XMGSJR3JV",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
