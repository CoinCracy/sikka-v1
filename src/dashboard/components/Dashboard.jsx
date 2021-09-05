import React, { Suspense, useEffect, useReducer, useRef, useState } from "react";
import { useParams , useHistory, Link } from "react-router-dom";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import { getMintPubkeyFromTokenAccountPubkey } from "../lib/createUtils";
import "../CSS/dashboard.scss"

const getProvider = () => {
  if ("solana" in window) {
    const provider = window.solana;
    if (provider.isPhantom) {
      return provider;
    }
  }
  // window.open("https://phantom.app/", "_blank");
};

function Dashboard(props) {
  const provider = getProvider();
  const tokenAddressArray = [];
  const [tokenData, setTokenData] = useState([]);
  const [providerLoaded , setProviderLoaded] = useState(false)
  const [listInitialized,setListInitialized] = useState(false)
  const [dataLoaded, setDataLoaded] = useState(false);
  
  const networks = {
    mainnet: {
      url: "https://solana-api.projectserum.com",
      displayName: "Mainnet Beta",
    },
    devnet: { url: clusterApiUrl("devnet"), displayName: "Devnet" },
    testnet: { url: clusterApiUrl("testnet"), displayName: "Testnet" },
  };
  const history = useHistory();

  const  manage = (tokenAddress) => {
    let path = `Dashboard/${tokenAddress}`; 
    history.push(path);
  }

  const solanaNetwork = networks.devnet;
  const connection = new Connection(solanaNetwork.url);

  useEffect(() => {

    // Function That Gets the Tokens 
    async function listToken() {

      // Gets the Array of Token Accounts 
      const tokenAccounts = await connection.getTokenAccountsByOwner(
        new PublicKey(provider.publicKey.toString()),
        {
          programId: TOKEN_PROGRAM_ID,
        }
      );
// Loops through Each Account and Retrieves Data from them 
      for (var i = 0; i < tokenAccounts.value.length; i++) {
        const tokenAccountAddress = tokenAccounts.value[i].pubkey.toString();
        const mint = await getMintPubkeyFromTokenAccountPubkey(
          new PublicKey(tokenAccountAddress)
        );
        console.log(mint.toString());
        const tokenAccountBalance = await connection.getTokenAccountBalance(
          new PublicKey(tokenAccountAddress)
        );
        console.log(tokenAccountBalance.value.amount);
        const totalSupply = await connection.getTokenSupply(mint);
        console.log(totalSupply.value.amount);

        setTokenData((prevTokenData) => {
          const newTokenData = [
            ...prevTokenData,
            {
              id: prevTokenData.length++,
              account: tokenAccountAddress,
              balance: tokenAccountBalance.value.amount,
              mint: mint.toString(),
              supply: totalSupply.value.amount,
            },
          ];
          return newTokenData;
        });

        if (tokenAccounts.value.length - 1 === i) {
          setDataLoaded(true);
        }
      }
    }
    
  if (provider.publicKey) {
    console.log("Provider Loaded")
   setProviderLoaded(true)
  }
    if (providerLoaded && !listInitialized) {
      console.log("Function Runs")
      listToken()
       setListInitialized(true)
    }
  }, [connection, listInitialized, provider, providerLoaded]);

  return (
    <>
      <hr></hr>
      <h1  className="dashboardHeader"> 
          Dashboard 
          {/* <Link to="/DEX" type="button">DEX</Link> */}
      </h1>
      
      {dataLoaded ? (
        <div>
          {tokenData.map((data) => (
            <div key={data.id} className="tokenItem">
              <p  className="dataMint">{data.mint}</p>
              <p  className="dataSupply">{data.supply}</p>
              <button  className="decimalsButton" onClick={()=> manage(data.mint) }>Manage</button>
            </div>
          ))}
        </div>
      ) : (
        <h1 className="dashboardHeader">Loading...</h1>
      )}
    </>
  );
}

export default Dashboard;
