import React, { useState } from "react";
import {
  freezeAccount,
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

function FreezeModal(props) {
  const [freezeassAccountCreated, setfreezeAssAccountCreated] = useState(false);

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

  async function freeze(receiver) {
    
    const associatedTokenAccount = await findAssociatedTokenAddress(
    new PublicKey(receiver),
    new PublicKey(props.mintAddress)
    );

    await freezeAccount(
        null,
        new PublicKey(associatedTokenAccount.toString()),
        null,
        true,
        true
    ).then((data) => {
        console.log(data);
    });
    
  }

  return (
    <div className="freeze-modal">
      <label htmlFor="#freezerecipient">Account to Freeze</label>
      <input type="text" id="freezerecipient"></input>

      <button
        onClick={() =>
          freeze(
            document.getElementById("freezerecipient").value
          )
        }
      >
        Freeze
      </button>
    </div>
  );
}

export default FreezeModal;
