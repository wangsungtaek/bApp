import logo from './logo.svg';
// eslint-disable-next-line
import { getBalance, readCount, setCount } from './api/UseCaver';
import './App.css';

function App() {
  // readCount();
  getBalance('0x112062575641eAd5Df26D91d73A556E3d9A31427');

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />\
        <button title={'카운트 변경'} onClick={() => {setCount(100)}}>카운트 변경</button>
        <p>
          GOOD <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
