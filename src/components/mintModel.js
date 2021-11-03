import { useState } from 'react'
import Mint from './mint'
import Arrow from './arrow'

import { AiFillCaretUp, AiFillCaretDown } from 'react-icons/ai'
import Web3 from 'web3'

export default function MintModel({
  onClick,
  Increment,
  Decrement,
  counter,
  totalSupply,
  signedIn,
  signIn,
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0 0 20px 0',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          verticalAlign: 'text-top',
        }}
      >
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <h1
            className="counter"
            style={{
              padding: '0',
              margin: '0',
            }}
          >
            {counter === 6970 ? 'Sold Out' : counter}
          </h1>
          {signedIn ? (
            <Mint onClick={onClick} />
          ) : (
            <button
              onClick={signIn}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '3rem',
                fontWeight: 'bolder',
                padding: '10px',
                boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.2)',
                borderRadius: '15px',
              }}
            >
              connect
            </button>
          )}

          <div
            style={{
              padding: '1rem 0',
            }}
          >
            {totalSupply} out of 6,969
          </div>
          <h4
            style={{
              padding: '0',
              margin: '0',
            }}
          >
            price: .055ETH
          </h4>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '0',
            margin: '0',
          }}
        >
          <Arrow Mint={Increment} Icon={AiFillCaretUp} />
          <Arrow Mint={Decrement} Icon={AiFillCaretDown} />
        </div>
      </div>
    </div>
  )
}
