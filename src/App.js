import './App.css';
import Map from './components/Map'
import DisplaySummary from './components/DisplaySummary';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';
import React from 'react';
import firebase from 'firebase';

// const FirestoreCollection = () => {
//   const { error, loading, value } = useCollection(
//     firebase.firestore().collection('hooks')
//   );
//   return (
//     <div>
//       <p>
//         {error && <strong>Error: {error}</strong>}
//         {loading && <span>Collection: Loading...</span>}
//         {value && (
//           <span>
//             Collection:{' '}
//             {value.docs.map(doc => (
//               <React.Fragment key={doc.id}>
//                 {JSON.stringify(doc.data())},{' '}
//               </React.Fragment>
//             ))}
//           </span>
//         )}
//       </p>
//     </div>
//   );
// };




function App() {

  const { error, loading, value } = useCollectionDataOnce(firebase.firestore().collection('establishments'))
  console.log(firebase, error, loading, value);

  return (
    <div className="App">
      <header className="App-header">
        {/* <ReactReduxContext.Consumer>
          {({ store }) => {

            let establishments = [];
            let users = [];
            let exchanges = [];

            let db = store.firestore;
            db.collection('establishments').get().then((est) => est.forEach((doc) => {
              establishments.push(doc.data())
            }));

            // users, exchanges

            db.collection('users').get().then((usr) => usr.forEach((doc) => {
              users.push(doc.data())
            }));

            db.collection('exchanges').get().then((exc) => exc.forEach((doc) => {
              exchanges.push(doc.data())
            }));

            return (
              <>
                <DisplaySummary className="DisplaySummary" noUser={users} noEstablishment={establishments} noExchange={exchanges} />
                <Map heatmap={establishments}></Map>
              </>
            )
          }}
        </ReactReduxContext.Consumer> */}


        <Map />
      </header>
    </div>
  );
}

export default App;
