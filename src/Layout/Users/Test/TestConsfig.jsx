// Your web app's Firebase configuration

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/storage";



const firebaseConfig = {
    apiKey: "AIzaSyBkK1k0790ny78SvJG2v-3Mkko_kJGe3u4",
    authDomain: "fir-1-b3068.firebaseapp.com",
    databaseURL: "https://fir-1-b3068-default-rtdb.firebaseio.com",
    projectId: "fir-1-b3068",
    storageBucket: "fir-1-b3068.appspot.com",
    messagingSenderId: "377924361537",
    appId: "1:377924361537:web:79b9970b2737df325bd5c0",
    measurementId: "G-T22FNM9GGZ"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
export const storage = getStorage(app);
