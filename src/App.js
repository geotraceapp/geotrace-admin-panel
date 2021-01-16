//import logo from './logo.svg';
import './App.css';
import Map from './pages/Map'
import DisplaySummary from './components/DisplaySummary';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <img src="logo192.png" className="App-logo" alt="logo" />
        <DisplaySummary />
        <Map/>
      </header>
    </div>
  );
}

export default App;
