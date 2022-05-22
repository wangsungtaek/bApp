import logo from './logo.svg';
import './App.css';
import Caver from 'caver-js';

const COUNT_CONTRACT_ADDRESS = '0x00b8F4af0a3206D52c2a66c4B6aF14396Af21B91';
const ACCESS_KEY_ID = 'KASKLVNH2Y6ETV1JRKOEDETL';
const SECERET_KEY_ID = 'HN0ZfzIkalI4HEVPecsHx3hn7lJj5mcOP0_kOLbH';
const CHAIN_ID = '1001'; // TEST NET: 1001, MAIN NET: 8217
const COUNT_ABI = '[ { "constant": true, "inputs": [], "name": "count", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_count", "type": "uint256" } ], "name": "setCount", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" } ]';

const option = {
  headers: [
    {
      name: "Authorization",
      value: "Basic " + Buffer.from(ACCESS_KEY_ID + ":" +  SECERET_KEY_ID).toString("base64")
    },
    { name: "x-chain-id", value: CHAIN_ID }
  ]
}

const caver = new Caver(new Caver.providers.HttpProvider("https://node-api.klaytnapi.com/v1/klaytn", option));
const CountContract = new caver.contract(JSON.parse(COUNT_ABI), COUNT_CONTRACT_ADDRESS);
const readCount = async () => {
  const _count = await CountContract.methods.count().call();
  console.log(_count);
}

const getBalance = (address) => {
  return caver.rpc.klay.getBalance(address).then((response) => {
    const balance = caver.utils.convertFromPeb(caver.utils.hexToNumberString(response));
    console.log("balance : ", balance);
    return balance
  })
}
// 1. smart contract 배포 주소 파악(가져오기)
// 2. caver.js 이용해서 스마트 컨트랙트 연동하기
// 3. 가져온 스마트 컨트랙트 실행 결과(데이터) 웹에 표현하기
function App() {
  readCount();
  getBalance('0x112062575641eAd5Df26D91d73A556E3d9A31427');
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
