import Head from "next/head";
import Web3 from "web3";
import { useState, useEffect } from "react";

import { ADDRESS, ABI } from "../config.js";
import Image from "next/image";
import MintModel from "../src/components/mintModel";
import banner from "../public/img/banner.jpg";

export default function Mint() {
  // FOR WALLET
  const [signedIn, setSignedIn] = useState(false);

  const [metaConnect, setMetaConnect] = useState(false);

  const [walletAddress, setWalletAddress] = useState(null);

  // FOR MINTING
  const [how_many_Tokens, set_how_many_Tokens] = useState(1);

  const [TestContract, setTestContract] = useState(null);

  // INFO FROM SMART Contract

  const [totalSupply, setTotalSupply] = useState(0);
  const [counter, setCounter] = useState(0);
  const [privatesaleStarted, setPrivateSaleStarted] = useState(false);
  const [publicsaleStarted, setPublicSaleStarted] = useState(false);
  const [TestPrice, setTestPrice] = useState(0);

  const onPublicMint = async () => {
    if (counter > 0) {
      await mintToken(counter);
      setCounter(0);
    }
  };

  const onPrivateMint = async () => {
    await mintAllowList(counter);
    setCounter(0);
  };
  const Increment = () => {
    if (privatesaleStarted) {
      if (counter < 2) {
        setCounter(counter + 1);
      }
    } else {
      if (counter < 3) {
        setCounter(counter + 1);
      }
    }
  };
  const Decrement = () => {
    if (!(counter <= 0)) setCounter(counter - 1);
  };

  async function signIn() {
    if (typeof window.web3 !== "undefined") {
      // Use existing gateway
      window.web3 = new Web3(window.ethereum);
    } else {
      alert("No Ethereum interface injected into browser. Read-only access");
    }

    window.ethereum
      .enable()
      .then(function (accounts) {
        window.web3.eth.net
          .getNetworkType()
          // checks if connected network is mainnet (change this to rinkeby if you wanna test on testnet)
          .then((network) => {
            console.log(network);
            if (network != "main") {
              alert(
                "You are on " +
                  network +
                  " network. Change network to mainnet or you won't be able to do anything here"
              );
            }
          });
        let wallet = accounts[0];
        console.log("wallet", wallet);
        setWalletAddress(wallet);
        setSignedIn(true);
        callContractData(wallet);
      })
      .catch(function (error) {
        // Handle error. Likely the user rejected the login
        console.error(error);
      });
  }

  //

  async function signOut() {
    setSignedIn(false);
  }

  async function callContractData(wallet) {
    const TestContract = new window.web3.eth.Contract(ABI, ADDRESS);
    const allowedListActive = await TestContract.methods
      .isAllowListActive()
      .call();
    const saleActive = await TestContract.methods.saleIsActive().call();
    const totalSupply = await TestContract.methods.totalSupply().call();
    const Price = await TestContract.methods.TokenPrice().call();

    setTestContract(TestContract);
    setPrivateSaleStarted(allowedListActive);
    setPublicSaleStarted(saleActive);
    setTotalSupply(totalSupply);
    setTokenPrice(Price);
  }

  async function mintToken(how_many_Tokens) {
    if (TestContract) {
      console.log("hello");
      const price = Number(TokenPrice) * how_many_Tokens;
      const gasAmount = await TestContract.methods
        .mintToken(how_many_Tokens)
        .estimateGas({ from: walletAddress, value: price });

      TestContract.methods
        .mintToken(how_many_Tokens)
        .send({ from: walletAddress, value: price, gas: String(gasAmount) })
        .on("transactionHash", function (hash) {
          console.log("transactionHash", hash);
          alert("Transaction In Proccess Please Check Metamask For Details");
        });
    } else {
      console.log("Wallet not connected");
      alert("Wallet not connected");
    }
  }

  async function mintAllowList(how_many_Tokens) {
    if (TestContract) {
      const price = Number(TokenPrice) * how_many_Tokens;
      const gasAmount = await TestContract.methods
        .mintAllowList(how_many_Tokens)
        .estimateGas({ from: walletAddress, value: price });

      await TestContract.methods
        .mintAllowList(how_many_Tokens)
        .send({ from: walletAddress, value: price, gas: String(gasAmount) })
        .on("transactionHash", function (hash) {
          console.log("transactionHash", hash);
          alert("Transaction In Proccess Please Check Metamask For Details");
        });
    } else {
      console.log("Wallet not connected");
      alert("Wallet not connected");
    }
  }

  if (typeof window !== "undefined") {
    return (
      <div id="appmain">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Barlow:wght@200&display=swap"
            rel="stylesheet"
          />
        </Head>
        <MintModel
          signIn={signIn}
          signedIn={signedIn}
          onClick={onPublicMint}
          Increment={Increment}
          Decrement={Decrement}
          counter={counter}
          totalSupply={totalSupply}
        />
      </div>
    );
  }
  return <div>Loading...</div>;
}
