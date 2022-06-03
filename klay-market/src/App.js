/* eslint-disable no-unused-vars */
import React, {useState} from "react";
import QRCode from 'qrcode.react';
import * as KlipAPI from './api/UseKlip';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./market.css";
import { Alert, Card, Container, Form, Nav, Button } from "react-bootstrap";

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
  const [tab, setTab] = useState("MINT");
  const [mintImageUrl, setMintImageUrl] = useState("");
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
  const onClickMint = async (uri) => {
    if (myAddress == DEFAULT_ADDRESS) alert("NO ADDR"); 
    const randomTokenId = parseInt(Math.random() * 10000000);
    KlipAPI.mintCardWithURI(
      myAddress,
      randomTokenId,
      uri,
      setQrvaule,
      (result) => {
        alert(JSON.stringify(result));
      }
    );
  };

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
      {/* 주소 잔고 */}
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

        {/* QR Code */}
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
        <br />

        {/* 갤러리(마켓, 내 지갑) */}
        { tab === 'MARKET' || tab === 'NFT' ? (
          <div className="container" style={{ padding: 0, width: "100%" }}>
            { nfts.length > 0 ? nfts.map((nft, index) => (
              <Card.Img className="img-responsive" src={nfts[index].uri} />
            )) : ''}
          </div>
        ) : null }
        {/* 발행 페이지 */}
        { tab === 'MINT' ? (
          <div className="container" style={{ padding: 0, width: "100%" }}>
            <Card
              className="text-center"
              style={{ color: "black", height: "50%", borderColor: "#C5B358" }}
            >
              <Card.Body style={{ opacity: 0.9, backgroundColor: "black" }} >
                {mintImageUrl !== "" ? (
                  <Card.Img src={mintImageUrl} height={"30%"} />
                ) : null }
                <Form>
                  <Form.Group>
                    <Form.Control
                      value={mintImageUrl}
                      onChange={(e) => {
                        console.log(e.target.value);
                        setMintImageUrl(e.target.value);
                      }}
                      type="text"
                      placeholder="이미지 주소를 입력해주세요."
                    />
                  </Form.Group>
                  <br />
                  <Button
                    onClick={() => {
                      onClickMint(mintImageUrl);
                    }}
                    variant="primary"
                    style={{
                      backgroundColor: "#810034",
                      borderColor: "#810034",
                    }}
                  >발행하기</Button>
                </Form>
              </Card.Body>
            </Card>
          </div>
        ) : null }
      </div>
      
      <button onClick={fetchMyNFTs}>가져오기</button>
      
      {/* 모달 */}

      {/* 탭 */}
      <nav
        style={{ backgroundColor: "#1b1717", height: 45 }}
        className="navbar fixed-bottom navbar-light"
        role="navigation"
      >
        <Nav className="w-100">
          <div className="d-flex flex-row justify-content-around w-100">
            <div
              onClick={() => {
                setTab("MARKET");
              }}
              className="row d-flex flex-column justify-content-center align-items-center"
            >
              <div>MARKET</div>
            </div>
            <div
              onClick={() => {
                setTab("MINT");
              }}
              className="row d-flex flex-column justify-content-center align-items-center"
            >
              <div>MINT</div>
            </div>
            <div
              onClick={() => {
                setTab("WALLET");
                fetchMyNFTs();
              }}
              className="row d-flex flex-column justify-content-center align-items-center"
            >
              <div>WALLET</div>
            </div>
          </div>
        </Nav>
      </nav>
    </div>
  );
}

export default App;
