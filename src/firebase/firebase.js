import firebase from '@firebase/app-compat';
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDFHPaOEUWIZHV0_E1xCIg24m69ONJSRP0",
  authDomain: "superteamdb.firebaseapp.com",
  projectId: "superteamdb",
  storageBucket: "superteamdb.appspot.com",
  messagingSenderId: "450211147793",
  appId: "1:450211147793:web:61b763d04c5e1e9517c1b0"
};


const app = firebase.initializeApp(firebaseConfig);
export function getFirebase() {
  return app;
}

export const database = firebase.firestore();