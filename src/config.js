import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDqmWvlgu_cByYAW70UISCuQcZzpwkMQZA",
  authDomain: "logintest-7c52f.firebaseapp.com",
  projectId: "logintest-7c52f",
  storageBucket: "logintest-7c52f.appspot.com",
  messagingSenderId: "712124155269",
  appId: "1:712124155269:web:4bafab35386817cdc870ec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };