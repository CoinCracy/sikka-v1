import React, { useState } from "react";
import {
  burnTokens,
  createAssociatedTokenAccount,
} from "../../lib/createUtils";

import { PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
const getProvider = () => {
  if ("solana" in window) {
    const provider = window.solana;
    if (provider.isPhantom) {
      return provider;
    }
  }
};

const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey(
  "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
);

function BurnModal(props) {
  async function findAssociatedTokenAddress(walletAddress, tokenMintAddress) {
    return (
      await PublicKey.findProgramAddress(
        [
          walletAddress.toBuffer(),
          TOKEN_PROGRAM_ID.toBuffer(),
          tokenMintAddress.toBuffer(),
        ],
        SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
      )
    )[0];
  }

  const provider = getProvider();

  async function burn(amount) {
    
    const sourceAddress = await findAssociatedTokenAddress(
        new PublicKey(provider.publicKey.toString()),
        new PublicKey(props.mintAddress)
    );

    await burnTokens(
        null,
        new PublicKey(sourceAddress.toString()),
        null,
        amount,
        true,
        true
    ).then((data) => {
    console.log(data);
    });

  }

  return (
    <div className="burn-modal">
      <label htmlFor="#burnamount">Amount</label>
      <input type="text" id="burnamount"></input>

      <button
        onClick={() =>
          burn(
            document.getElementById("burnamount").value,
          )
        }
      >
        Burn
      </button>
    </div>
  );
}

export default BurnModal;
