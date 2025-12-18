import { initializeApp } from "firebase/app"
import { getFirestore, Firestore, collection, doc, addDoc, deleteDoc, updateDoc, onSnapshot } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_APIKEY,
  authDomain: process.env.EXPO_PUBLIC_AUTHDOMAIN,
  projectId: process.env.EXPO_PUBLIC_PROJECTID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.EXPO_PUBLIC_APPID
}

const app = initializeApp(firebaseConfig)
const firestore: Firestore = getFirestore(app)

export {
    firestore,
    collection,
    doc,
    addDoc,
    deleteDoc,
    updateDoc,
    onSnapshot
}