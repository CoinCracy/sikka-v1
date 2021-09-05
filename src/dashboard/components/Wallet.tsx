import { useState, useEffect } from "react";
import {
  Connection,
  PublicKey,
  Transaction,
  clusterApiUrl,
  SystemProgram
} from "@solana/web3.js";
import "../CSS/connect.scss"
import Drawer from "./Drawer";
import { useParams , useHistory, Link } from "react-router-dom";
import { Button } from "antd";

type DisplayEncoding = "utf8" | "hex";
type PhantomEvent = "disconnect" | "connect";
type PhantomRequestMethod =
  | "connect"
  | "disconnect"
  | "signTransaction"
  | "signAllTransactions"
  | "signMessage";

interface ConnectOpts {
  onlyIfTrusted: boolean;
}

interface PhantomProvider {
  publicKey: PublicKey | null;
  isConnected: boolean | null;
  autoApprove: boolean | null;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>;
  signMessage: (
    message: Uint8Array | string,
    display?: DisplayEncoding
  ) => Promise<any>;
  connect: (opts?: Partial<ConnectOpts>) => Promise<void>;
  disconnect: () => Promise<void>;
  on: (event: PhantomEvent, handler: (args: any) => void) => void;
  request: (method: PhantomRequestMethod, params: any) => Promise<any>;
}

// Get The Solana Provider 
const getProvider = (): PhantomProvider | undefined => {
  if ("solana" in window) {
    const provider = (window as any).solana;
    if (provider.isPhantom) {
      return provider;
    }
  }
  // window.open("https://phantom.app/", "_blank");
};


const NETWORK = clusterApiUrl("devnet");

export default function Connect(props : any) {

  const provider = getProvider();
  
  const [logs, setLogs] = useState<string[]>([]);
  const addLog = (log: string) => setLogs([...logs, log]);

  const connection = new Connection(NETWORK);
  
  const [, setConnected] = useState<boolean>(false);

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
  <div id = "navbar"> 

  <div className="sikkaHeader" >
  <Drawer/>
    <img src="sikkaLogo.svg" className ="headerImage" />
    <h2  className ="header">Sikka - Democratizing Token</h2>
  </div>
    <div id="connect-button"> 
      <main>
        {provider && provider.publicKey ? (
          <>
            <div className ="connect-button" onClick={() => provider.disconnect()}> 
            {provider.publicKey?.toBase58().slice(0,5)}... {provider.publicKey?.toBase58().slice(-5)}
            </div>
            {/* <div>autoApprove: {provider.autoApprove ? "true" : "false"} </div> */}
            {/* <button onClick={() => provider.disconnect()}>Disconnect</button> */}
            <div className="connect-button1"><Link to="/DEX" type="button">DEX</Link></div>
            <div className="connect-button2"><Link to="/Dashboard" type="button">Dashboard</Link></div>
          </>
        ) : (
          <>
            <div className="connect-button1"><Link to="/DEX" type="button">DEX</Link></div>
            <div className="connect-button2"><Link to="/Dashboard" type="button">Dashboard</Link></div>
            <div className ="connect-button" onClick={() => provider?.connect()}>
              Connect
            </div>

          </>
        )}
      </main>
    </div>
    </div>
  );
}