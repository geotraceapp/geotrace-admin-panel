import './App.css';
import Map from './components/Map'
import DisplaySummary from './components/DisplaySummary';
import { ReactReduxContext } from 'react-redux'

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <DisplaySummary className="DisplaySummary" />
        <Map />

        <ReactReduxContext.Consumer>
          {({ store }) => {
            /*
              ---PLACEHOLDER CODE---
            */
            let db = store.firestore
            let testRef = db.collection('testData').doc('test1');
            testRef.get().then((doc) => {
              if (!doc.exists) {
                console.log('No such document!');
              } else {
                console.log('Document data:', doc.data());
              }
            })
          }}
        </ReactReduxContext.Consumer>
      </header>
    </div>
  );
}

export default App;
