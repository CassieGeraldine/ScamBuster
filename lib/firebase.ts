import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDoxNDufMbN9_YuFnMGwYudQN3tZy8qdSA",
  authDomain: "cyberbuster-7020c.firebaseapp.com",
  projectId: "cyberbuster-7020c",
  storageBucket: "cyberbuster-7020c.firebasestorage.app",
  messagingSenderId: "292888145046",
  appId: "1:292888145046:web:10cd26ea9f26d80fb6a6b7",
  measurementId: "G-RGD3MSK9T7"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);