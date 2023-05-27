import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCgJBVYhi3_fGb_kPro57p8ljV7StnvscA",
  authDomain: "gomoku-6f56d.firebaseapp.com",
  projectId: "gomoku-6f56d",
  storageBucket: "gomoku-6f56d.appspot.com",
  messagingSenderId: "684179748658",
  appId: "1:684179748658:web:570a28d1fda578a937892b",
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
