import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDf1_a0sNY9wya9esBP3tvpQIz9uxOlD3s",
  authDomain: "geotrace-301902.firebaseapp.com",
  projectId: "geotrace-301902",
  storageBucket: "geotrace-301902.appspot.com",
  messagingSenderId: "858490686574",
  appId: "1:858490686574:web:213b6cae8defb2b7e72a7f"
};
//const rfConfig = {}; // optional redux-firestore Config Options

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);
// Initialize Cloud Firestore through Firebase
firebase.firestore();


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
