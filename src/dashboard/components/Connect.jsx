import { useState, useEffect } from "react";
import {
  Connection,
  PublicKey,
  Transaction,
  clusterApiUrl,
  SystemProgram
} from "@solana/web3.js";
import { getAllTokens } from "../../dex/utils/tokenAction";


const getProvider = () => {
    if ("solana" in window) {
      const provider = (window).solana;
      if (provider.isPhantom) {
        return provider;
      }
    }
  };

  const NETWORK = clusterApiUrl("devnet");

  export default function ConnectButton(props) {

    const [ connected , setConnected ] = useState(false)
    const provider = getProvider();
    const connection = new Connection(NETWORK); 


    
  useEffect(() => {
    if (provider) {
      provider.on("connect", () => {
        setConnected(true);
        props.setProvider(provider)
      });
      provider.on("disconnect", () => {
        setConnected(false);
      });
      // try to eagerly connect
      provider.connect()
      return () => {
        provider.disconnect();
      };
    }
  }, [provider]);


return (
    <div>
        {connected ? <p>{provider.publicKey.toString()}</p> : <button onClick ={() => provider.connect()}>Connect</button> }
</div>
)





  }

  