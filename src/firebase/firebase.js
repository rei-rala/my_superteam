import firebase from '@firebase/app-compat';
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBoJR_o-5K57sz1S1BXjkv-es4vA-Dl6sQ",

  authDomain: "stdb-d6810.firebaseapp.com",

  projectId: "stdb-d6810",

  storageBucket: "stdb-d6810.appspot.com",

  messagingSenderId: "746346632230",

  appId: "1:746346632230:web:83693eade38b6926c982e7"

};


const app = firebase.initializeApp(firebaseConfig);
export function getFirebase() {
  return app;
}

export const database = firebase.firestore();