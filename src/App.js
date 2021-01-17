import './App.css';
import Map from './components/Map'
import DisplaySummary from './components/DisplaySummary';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';
import React from 'react';
import firebase from 'firebase';

function App() {

  const [estValues, estLoading] = useCollectionDataOnce(firebase.firestore().collection('establishments'));
  const [userValues, userLoading] = useCollectionDataOnce(firebase.firestore().collection('users'))
  const [exValues, exLoading] = useCollectionDataOnce(firebase.firestore().collection('exchanges'))

  let establishments;
  if (typeof estValues == 'undefined') {
    establishments = [];
  } else {
    establishments = estValues;
  }

  let users;
  if (typeof userValues == 'undefined') {
    users = [];
  } else {
    users = userValues;
  }

  let exchanges;
  if (typeof exValues == 'undefined') {
    exchanges = [];
  } else {
    exchanges = exValues;
  }


  console.log(establishments)

  return (
    <div className="App">
      <header className="App-header">
        <DisplaySummary className="DisplaySummary" noUsers={users.length} noEstablishments={establishments.length} noExchanges={exchanges.length}></DisplaySummary>
        <Map establishments={establishments} />
      </header>
    </div>
  );
}

export default App;
