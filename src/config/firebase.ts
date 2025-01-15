import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC4sRaR8FZXqFFo7Zz82BW6-RewcR85gBc",
    authDomain: "diamoondb-1412.firebaseapp.com",
    projectId: "diamoondb-1412",
    storageBucket: "diamoondb-1412.appspot.com",
    messagingSenderId: "1080922134641",
    appId: "1:1080922134641:web:e383d949a5548e3465e3d0",
    measurementId: "G-CJG82XKXKB"
  };

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { app, storage };
