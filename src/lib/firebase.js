import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "Put your API KEY from firebase",
  authDomain: "real-time-chat-app-c70f2.firebaseapp.com",
  projectId: "real-time-chat-app-c70f2",
  storageBucket: "real-time-chat-app-c70f2.appspot.com",
  messagingSenderId: "421303741244",
  appId: "1:421303741244:web:85e655cd9e2bd032f84c39"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()

