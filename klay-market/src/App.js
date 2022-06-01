/* eslint-disable no-unused-vars */
import React, {useState} from "react";
import QRCode from 'qrcode.react';
import * as KlipAPI from './api/UseKlip';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./market.css";
import { Alert, Card, Container } from "react-bootstrap";

// eslint-disable-next-line
import { getBalance, fetchCardsOf } from './api/UseCaver';
import './App.css';

const onPressButton2 = (_balance, _setBalance) => {
  _setBalance(_balance);
}
const DEFAULT_QR_CODE = 'DEFAULT';
const DEFAULT_ADDRESS = '0x000000000000000000000000';
function App() {
  const [nfts, setNfts] = useState([]);
  const [myBalance, setMyBalance] = useState('0');
  const [myAddress, setMyAddress] = useState(DEFAULT_ADDRESS);

  // UI
  const [qrvalue, setQrvaule] = useState(DEFAULT_QR_CODE);
  // tab
  // mintInput

  // Modal

  // fetchMarketNFTs
  // fetchMyNFTs
  const fetchMyNFTs = async () => {
    const _nfts = await fetchCardsOf("0xab02aa8d37dBA20dC40900DD828b67A576ECd021");
    setNfts(_nfts);
  };
  // onClickMint
  // onClickMyCard
  // onClickMarketCard

  // 사용자 주소 및 클레이 가져오기
  const getUserData = () => {
    KlipAPI.getAddress(setQrvaule, async (address) => {
      setMyAddress(address);
      const _balance = await getBalance(address);
      setMyBalance(_balance);
    });
  };


  return (
    <div className="App">
      <div style={{backgroundColor: "black", padding: 10}}>
        <div
          style={{
            fontSize: 30,
            fontWeight: "bold",
            paddingLeft: 5,
            marginTop: 10,
          }}
        >
          내 지갑
        </div>
        {myAddress}
        <br />
        <Alert 
          onClick={getUserData}
          variant={"balance"}
          style={{ backgroundColor: "#f40075", fontSize: 25 }}
        >
          {myBalance}
        </Alert>

        {/* 갤러리(마켓, 내 지갑) */}
        <div className="container" style={{ padding: 0, width: "100%" }}>
          { nfts.length > 0 ? nfts.map((nft, index) => (
            <Card.Img className="img-responsive" src={nfts[index].uri} />
          )) : ''}
        </div>
      </div>
      {/* 주소 잔고 */}
      <Container
        style={{
          backgroundColor: "white",
          width: 300,
          height: 300,
          padding: 20,
        }}
      >
        <QRCode value={qrvalue} size={256} style={{ margin: "auto" }} />  
      </Container>
      <button onClick={fetchMyNFTs}>가져오기</button>
      
      {/* 발행 페이지 */}
      {/* 탭 */}
      {/* 모달 */}
    </div>
  );
}

export default App;
