import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, 
    getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAg28liSoyxu1htEhRMBslGAQU4Q2Y_ARk",
  authDomain: "netflex-web.firebaseapp.com",
  projectId: "netflex-web",
  storageBucket: "netflex-web.firebasestorage.app",
  messagingSenderId: "570556233002",
  appId: "1:570556233002:web:7bcf704319a4caa38e5a53"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password)=>{
    try {   
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};