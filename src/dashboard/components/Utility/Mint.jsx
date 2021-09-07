import React, { useState } from "react";
import {
  mintToken,
  createAssociatedTokenAccount,
} from "../../lib/createUtils";

import { PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import "../../CSS/transfer.scss"
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

function MintModal(props) {
  const [mintassAccountCreated, setmintAssAccountCreated] = useState(false);

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

  async function mint(amount, receiver) {
    if (mintassAccountCreated) {
        const associatedTokenAccount = await findAssociatedTokenAddress(
            new PublicKey(receiver),
            new PublicKey(props.mintAddress)
          );
    
          await mintToken(
            null,
            null,
            new PublicKey(associatedTokenAccount.toString()),
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
      ).then(setmintAssAccountCreated(true));

      await mintToken(
        null,
        null,
        new PublicKey(associatedTokenAccount.toString()),
        amount,
        true,
        true
      ).then((data) => {
        console.log(data);
      });
    }
  }

  return (
    <>
      <label  className="label" htmlFor="#mintamount">Amount</label>
      <input className="focus:ring-indigo-500 focus:border-indigo-500 block w-full text-black mb-5 duration-100 p-2 sm:text-sm border-gray-300 rounded-md" autocomplete="off"  placeholder='Token Amount' type="text" id="mintamount"></input>

      <label  className="label" htmlFor="#mintrecipient">Receiver</label>
      <input  placeholder='Receiver’s address'className="focus:ring-indigo-500 focus:border-indigo-500 block w-full text-black mb-5 duration-100 p-2 sm:text-sm border-gray-300 rounded-md" autocomplete="off" type="text" id="mintrecipient"></input>

      <button
         className = "p-2 mb-30 rounded-md shadow-lg bg-indigo-500 mt-5 hover:shadow-xl duration-300 hover:bg-indigo-600"
        onClick={() =>
          mint(
            document.getElementById("mintamount").value,
            document.getElementById("mintrecipient").value
          )
        }
      >
        Mint
      </button>
    </>
  );
}

export default MintModal;