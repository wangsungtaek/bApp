import React, {useState} from "react";
import QRCode from 'qrcode.react';
import * as KlipAPI from './api/UseKlip';

// eslint-disable-next-line
import { getBalance, readCount, setCount } from './api/UseCaver';
import './App.css';

const onPressButton2 = (_balance, _setBalance) => {
  _setBalance(_balance);
}
const DEFAULT_QR_CODE = 'DEFAULT';

function App() {
  const [balance, setBalance] = useState('0');
  const [qrvalue, setQrvaule] = useState(DEFAULT_QR_CODE);
  // readCount();
  getBalance('0x112062575641eAd5Df26D91d73A556E3d9A31427');
  const onClickgetAddress = () => {
    KlipAPI.getAddress(setQrvaule);
  }
  const onClickSetCount = () => {
    KlipAPI.setCount(2000, setQrvaule);
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => {onClickgetAddress()}}>주소 가져오기</button>
        <button onClick={() => {onClickSetCount()}}>카운트 값 변경</button>
        <br />
        <QRCode value={qrvalue} />
        <p>{ balance }</p>
      </header>
    </div>
  );
}

export default App;
