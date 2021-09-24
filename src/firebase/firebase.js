import firebase from '@firebase/app-compat';
import 'firebase/compat/firestore'

const firebaseConfig = {
  appId: process.env.REACT_APP_APPID,
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
};

const app = firebase.initializeApp(firebaseConfig);
export function getFirebase() {
  return app;
}

export const database = firebase.firestore();