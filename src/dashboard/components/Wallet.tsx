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
    <a href="/app">
    <div className="sikkaHeader" >
      <img src="sikkaLogo.svg" className ="headerImage" />
      <span className ="header">Sikka - Democratizing Token</span>
    </div>
    </a>
    <div className="navbar-buttons"> 
      <ul>
      {(provider && provider.publicKey) ? (
          <li onClick={() => provider.disconnect()}>Connected</li>
      ) : (
          <li onClick={() => provider?.connect()}>Connect</li>
      )}
      <li><Link to="/dashboard" type="button">Dashboard</Link></li>
      <li><Link to="/dex" type="button">DEX</Link></li>
        </ul>
    </div>
    </div>
  );
}