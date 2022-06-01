/* eslint-disable no-unused-vars */
import Caver from 'caver-js';
// import CounterABI from '../abi/CounterABI.json';
import KIP17ABI from '../abi/KIP17TokenABI.json';
import { ACCESS_KEY_ID, SECERET_KEY_ID, COUNT_CONTRACT_ADDRESS, NFT_CONTRACT_ADDRESS, CHAIN_ID } from '../constants/index.js';

const option = {
  headers: [
    {
      name: "Authorization",
      value: "Basic " + Buffer.from(ACCESS_KEY_ID + ":" +  SECERET_KEY_ID).toString("base64")
    },
    { name: "x-chain-id", value: CHAIN_ID }
  ]
}

// 스마트컨트랙트 함수 실행
const caver = new Caver(new Caver.providers.HttpProvider("https://node-api.klaytnapi.com/v1/klaytn", option));
const NFTContract = new caver.contract(KIP17ABI, NFT_CONTRACT_ADDRESS);


export const fetchCardsOf = async (address) => {
  // Fetch Balance
  const balance = await NFTContract.methods.balanceOf(address).call();
  console.log(`[NFT Balance]${balance}`);
  // Fetch Token IDs
  const tokenIds = [];
  for(let i = 0; i < balance; i ++) {
    const tokenId = await NFTContract.methods.tokenOfOwnerByIndex(address, i).call();
    tokenIds.push(tokenId);
  }
  console.log("[Token Ids]",tokenIds);

  // Fetch Token URIs
  const tokenURIs = [];
  for(const id of tokenIds) {
    const tokenURI = await NFTContract.methods.tokenURI(id).call();
    tokenURIs.push(tokenURI);
  }
  console.log("[Token URIs]", tokenURIs);

  const nfts = [];
  for(let i = 0; i < balance; i ++) {
    nfts.push({ uri: tokenURIs[i], id: tokenIds[i] });
  }
  console.log("[nfts]", nfts);
  return nfts;
}


// 잔고 조회
export const getBalance = (address) => {
  return caver.rpc.klay.getBalance(address).then((response) => {
    const balance = caver.utils.convertFromPeb(caver.utils.hexToNumberString(response));
    console.log("balance : ", balance);
    return balance
  })
}

// const CountContract = new caver.contract(CounterABI, COUNT_CONTRACT_ADDRESS);

// 카운트 읽기
// export const readCount = async () => {
//   const _count = await CountContract.methods.count().call();
//   console.log(_count);
// }

// 카운트 설정
// export const setCount = async (newCount) => {
//   // 사용할 account 설정
//   try {
//     const privatekey = '0x08c00504730d45af8b0ef3b320db599f1bf3b65b5300b2f3d8978bfadd683458';
//     const deployer = caver.wallet.keyring.createFromPrivateKey(privatekey);
//     caver.wallet.add(deployer);
//     // 스마트 컨트랙트 실행 트랜잭션 날리기
//     // 결과 확인
  
//     const receipt = await CountContract.methods.setCount(newCount).send({
//       from: deployer.address, // address
//       gas: "0x4bfd200"
//     });
//     console.log("receipt:", receipt);
//   } catch(e) {
//     console.log(`[ERROR_SET_COUNT]${e}`);
//   }
// }