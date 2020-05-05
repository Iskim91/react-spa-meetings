import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_GOOGLE_API_KEY}`,
  authDomain: "react-spa-f0ecc.firebaseapp.com",
  databaseURL: "https://react-spa-f0ecc.firebaseio.com",
  projectId: "react-spa-f0ecc",
  storageBucket: "react-spa-f0ecc.appspot.com",
  messagingSenderId: "449845466435",
  appId: `${process.env.REACT_APP_GOOGLE_APP_ID}`
};

firebase.initializeApp(firebaseConfig);


export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = new firebase.auth();

export default firebase;
