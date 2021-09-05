import React, { useState } from "react";
import {
  transferTokens,
  createAssociatedTokenAccount,
} from "../../lib/createUtils";
import "../../CSS/transfer.scss"

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

function TransferModal(props) {
  const [assAccountCreated, setAssAccountCreated] = useState(false);

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

  async function transfer(amount, receiver) {
    if (assAccountCreated) {
      const associatedTokenAccount = await findAssociatedTokenAddress(
        new PublicKey(receiver),
        new PublicKey(props.mintAddress)
      );

      const sourceAddress = await findAssociatedTokenAddress(
        new PublicKey(provider.publicKey.toString()),
        new PublicKey(props.mintAddress)
      );
      console.log(sourceAddress.toString());

      await transferTokens(
        null,
        new PublicKey(sourceAddress.toString()),
        new PublicKey(associatedTokenAccount.toString()),
        null,
        amount,
        true,
        true
      ).then((data) => {
        console.log(data);
      });
    } else {
      const associatedTokenAccount = await createAssociatedTokenAccount(
        null,
        true,
        props.mintAddress,
        receiver
      ).then(setAssAccountCreated(true));

      const sourceAddress = await findAssociatedTokenAddress(
        new PublicKey(provider.publicKey.toString()),
        new PublicKey(props.mintAddress)
      );
      console.log(sourceAddress.toString());

      await transferTokens(
        null,
        new PublicKey(sourceAddress.toString()),
        new PublicKey(associatedTokenAccount.toString()),
        null,
        amount,
        true,
        true
      ).then((data) => {
        console.log(data);
      });
    }
  }

  return (
    <div className="transfer-modal">
      <label className="label" htmlFor="#amount">Amount</label>
      <input  className ="decimals" type="text" id="amount"></input>

      <label className="label"  htmlFor="#recipient">Receiver</label>
      <input  className ="decimals" type="text" id="recipient"></input>

      <button
         className = "transfer-button" 
        onClick={() =>
          transfer(
            document.getElementById("amount").value,
            document.getElementById("recipient").value
          )
        }
      >
        Transfer
      </button>
    </div>
  );
}

export default TransferModal;
