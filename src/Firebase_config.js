// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA9IqaAGrEcbJIsx8yzjCv3S1s7EGzHHdM",
  authDomain: "plan-it-daf58.firebaseapp.com",
  projectId: "plan-it-daf58",
  databaseURL: "https://plan-it-daf58-default-rtdb.asia-southeast1.firebasedatabase.app/" ,
  storageBucket: "plan-it-daf58.appspot.com",
  messagingSenderId: "680149490633",
  appId: "1:680149490633:web:ecd2aae71edf7f3b5ae618",
  measurementId: "G-ZZP1D14YLC"
};


const app = initializeApp(firebaseConfig);

export const auth =getAuth(app);
export const database = getDatabase(app);


