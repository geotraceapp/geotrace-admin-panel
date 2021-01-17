import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, combineReducers, compose } from 'redux';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import { Provider } from 'react-redux';
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

// Add reduxFirestore store enhancer to store creator
const createStoreWithFirebase = compose(
  reduxFirestore(firebase), // firebase instance as first argument, rfConfig as optional second
)(createStore);

// Add Firebase to reducers
const rootReducer = combineReducers({
  firestore: firestoreReducer,
});

// Create store with reducers and initial state
const initialState = {};
const store = createStoreWithFirebase(rootReducer, initialState);



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
