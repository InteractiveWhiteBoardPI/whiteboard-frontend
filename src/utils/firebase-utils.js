import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAX_cQiBqfnnKVT16Jr6E4WRbrescVpfXw",
  authDomain: "whiteboard-fa28f.firebaseapp.com",
  projectId: "whiteboard-fa28f",
  storageBucket: "whiteboard-fa28f.appspot.com",
  messagingSenderId: "298468257256",
  appId: "1:298468257256:web:eedf0b3561b85cc382885d",
};

initializeApp(firebaseConfig);


export const auth = getAuth();

export const registerUser = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const loginUser = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};

const provider = new GoogleAuthProvider();

export const loginInWithGoogle = async () => signInWithPopup(auth, provider);
  
