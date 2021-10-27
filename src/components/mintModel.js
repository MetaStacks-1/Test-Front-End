import { useState } from "react";
import Mint from "./mint";
import Arrow from "./arrow";

import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import Web3 from "web3";

export default function MintModel({
  onClick,
  Increment,
  Decrement,
  counter,
  totalSupply,
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0 0 20px 0"
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          verticalAlign: "text-top",
        }}
      >
        <div
          style={{
            textAlign: "center",
          }}
        >
          <h1
            className="counter"
            style={{
              padding: "0",
              margin: "0",
            }}
          >
            {counter === 6970 ? "Sold Out": counter}
          </h1>
          <Mint onClick={onClick} />
          <div
            style={{
              padding: "1rem 0",
            }}
          >
            {totalSupply} out of 6,969
          </div>
          <h4
            style={{
              padding: "0",
              margin: "0"
            }}
          >
            price: .06969ETH
          </h4>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "0",
            margin: "0",
          }}
        >
          <Arrow Mint={Increment} Icon={AiFillCaretUp} />
          <Arrow Mint={Decrement} Icon={AiFillCaretDown} />
        </div>
      </div>
    </div>
  );
}
