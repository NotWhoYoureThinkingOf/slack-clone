import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBKcaZFAbToMVy7QB06NxXi5bRMED2R5Gs",
  authDomain: "slack-clone-c936b.firebaseapp.com",
  databaseURL: "https://slack-clone-c936b.firebaseio.com",
  projectId: "slack-clone-c936b",
  storageBucket: "slack-clone-c936b.appspot.com",
  messagingSenderId: "910467080832",
  appId: "1:910467080832:web:8abd8e6198073b35f37c65",
  measurementId: "G-BS364EMGEK"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;