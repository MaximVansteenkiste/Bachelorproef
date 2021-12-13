import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/analytics";
import "firebase/auth";
import "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyCFLuuB1wuh5uEHP03ukXEmolm58nj6nbE",
  authDomain: "bar-app-381be.firebaseapp.com",
  databaseURL: "https://bar-app-381be.firebaseio.com",
  projectId: "bar-app-381be",
  storageBucket: "bar-app-381be.appspot.com",
  messagingSenderId: "387512645093",
  appId: "1:387512645093:web:ec537aa4bb2c0def09eb0c",
  measurementId: "G-5JS5RWZMJ9",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
}

if (process.env.NODE_ENV === "development") {
  // firebase.functions().useEmulator("localhost", 5001);
  // firebase.firestore().useEmulator("localhost", 8080);
}

export const querySnapshotToData = (qs) => {
  try {
    return { ...qs.data(), id: qs.id };
  } catch {
    const array = [];
    qs.forEach((q) => array.push({ ...q.data(), id: q.id }));
    return array;
  }
};

export default firebase;
export const db = firebase.firestore();
export const auth = firebase.auth();
export const functions = firebase.functions();
