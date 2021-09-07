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
 {dataLoaded ? 

      <div className="flex flex-col ">
      <h2 className = "text-indigo-800 font-bold text-lg text-center"> Token List </h2>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-indigo-100 sm:rounded-lg">
            <table className="min-w-full divide-y divide-indigo-100">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs ml-4 font-medium text-indigo-500 uppercase tracking-wider"
                  >
                   Mint
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-indigo-500 uppercase tracking-wider"
                  >
                   Account
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-indigo-500 uppercase tracking-wider"
                  >
                    Total Supply
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-indigo-500 uppercase tracking-wider"
                  >
                    Balance
                  </th>
                  
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Manage</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tokenData.map((token) => (
                  <tr key={token.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">{token.mint}</div>
                      </div>
                    </td>
                    <td>
                    <div className="text-sm font-medium text-gray-500">{token.account}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                     
                      <div className="text-sm text-gray-900">{token.supply}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{token.balance}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button  className="bg-indigo-500 text-white p-1 rounded-lg duration-300 hover:bg-indigo-800 " onClick={()=> manage(token.mint) }>Manage</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    : <p className = "text-black">Loading</p>}
      {/* <h1  className="dashboardHeader"> 
          Dashboard 
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
      )} */}
    </>
  );
}

export default Dashboard;
