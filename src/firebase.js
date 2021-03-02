import firebase from 'firebase';

const firebaseConfig = firebase.initializeApp(({
  apiKey: "AIzaSyDXCFjDiJHBa1HnBOZ7gSI9MbAzy-Rq0IM",
  authDomain: "strapped-163613.firebaseapp.com",
  databaseURL: "https://strapped-163613.firebaseio.com",
  projectId: "strapped-163613",
  storageBucket: "strapped-163613.appspot.com",
  messagingSenderId: "671753555792",
  appId: "1:671753555792:web:a461bfb66cf982a2316655"
}));

const db = firebaseConfig.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const google = new firebase.auth.GoogleAuthProvider()
const facebook = new firebase.auth.FacebookAuthProvider()
export { db, auth, storage, google, facebook };
