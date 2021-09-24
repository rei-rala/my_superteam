import firebase from '@firebase/app-compat';
import 'firebase/compat/firestore'

const firebaseConfig = {
  appId: process.env.REACT_APP_appId,
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
};

console.table(firebaseConfig)
const app = firebase.initializeApp(firebaseConfig);
export function getFirebase() {
  return app;
}

export const database = firebase.firestore();