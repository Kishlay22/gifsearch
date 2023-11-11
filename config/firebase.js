import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAAWiMEZMmATlk_E45BclQ1aLB5eEy8oaA",
  authDomain: "alphabi-7aa14.firebaseapp.com",
  projectId: "alphabi-7aa14",
  storageBucket: "alphabi-7aa14.appspot.com",
  messagingSenderId: "746641260522",
  appId: "1:746641260522:web:d189a452e9d0bd4aed7c93"
};

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);