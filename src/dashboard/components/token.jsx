import React , {useState , useEffect} from 'react'
import { Connection,  clusterApiUrl , PublicKey} from "@solana/web3.js";
import Dashboard from './Dashboard';
import { useHistory } from 'react-router-dom'
// CSS 
import "../CSS/token.css"
//Utils
import { createNewToken , createTokenAccount, createAssociatedTokenAccount, mintToken } from '../lib/createUtils'
import { getNodeRpcURL, getTxExplorerURL, getNodeWsURL ,getAccountExplorerURL  } from '../lib/utils';
import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import TokenSteps from './TokenSteps';

function TokenCreator(props) {

  const [loading ,  setLoading] = useState()
  const [step , setStep ] = useState(1)
  const [tokenAddress , setTokenAddress ] =  useState()
  const [tokenAccountAddress , setTokenAccountAddress ] = useState()
  const [mintAuthorityAddress , setMintAuthority ] = useState()


  const networks = {
    mainnet: { url: "https://solana-api.projectserum.com", displayName: "Mainnet Beta" },
    devnet: { url: clusterApiUrl("devnet"), displayName: "Devnet" },
    testnet: { url: clusterApiUrl("testnet"), displayName: "Testnet" },
  };
  const history = useHistory();
  const solanaNetwork = networks.devnet;
  const connection = new Connection(solanaNetwork.url);

  const getConnection = () => connection;

  useEffect(() => {

    return () => {
      
    }
  },[])
  
  const  dash = () => {
    let path = `dashboard`; 
    history.push(path);
  }

async function createToken() { 

    let decimals = document.getElementById("decimals").value;
 
    let name = document.getElementById("name").value
    let symbol = document.getElementById("symbol").value
    
     try {
    const tokenInit = await createNewToken(null , props.provider.publicKey , props.provider.publicKey, decimals , true).then((data) =>
      {
      console.log(data)
      console.log("Mint Address" , data.publicKey.toString())
      setMintAuthority(props.provider.publicKey)
      setTokenAddress(data.publicKey.toString())


      let mintAddr = data.publicKey.toString()
      let newObj = {
          tokenSymbol : symbol,
          mintAddress : mintAddr,
          tokenName : name,
          icon: "https://raw.githubusercontent.com/trustwallet/assets/08d734b5e6ec95227dc50efef3a9cdfea4c398a1/blockchains/ethereum/assets/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png",
      }

      localStorage.setItem("mintedTokens", JSON.stringify(newObj));
      
      // try {
      //   const jsonString = fs.readFileSync("../../dex/utils/token-list.json", "utf-8");
      //   console.log(jsonString);
      // } catch(err) {
      //   console.log(err);
      // }

      setStep(2)
      })

     } catch (error) {
       console.log(error)
     }
  
}

async function createTokenAcc() {
 try {
  await createAssociatedTokenAccount(null , true, tokenAddress , mintAuthorityAddress , true).then((data) => {
    console.log("Associated Token Account " , data)
    setTokenAccountAddress(data)
    setStep(3) 
  })

  console.log(tokenAddress)
  const tokenAccounts = await connection.getTokenAccountsByOwner(new PublicKey(props.provider.publicKey.toString()) , {
    programId: TOKEN_PROGRAM_ID})
  console.log(tokenAccounts.value)
  console.log(tokenAddress)
 } catch (error) {
   console.log(error)
 }
}

async function InitializeMintTo() {

const tokenSupply = document.getElementById("token-supply").value
 const mintedTokens = await  mintToken( null , null , tokenAccountAddress , tokenSupply , true , true)
 console.log(mintedTokens)
 props.setToken({mintAddress : tokenAddress , accountAddress : tokenAccountAddress })
 setStep(4)
}
const getId = (step) => {
  switch(step) {
    case 1 :
      return 'create-mint';
    case 2 :
      return 'initialize-token-account';
    case 3 :
      return 'transfer-token';
    case 4 :
      return 'create-mint';
  }
}

const getOnClick = (step) => {
  switch(step) {
    case 1 :
      return ()=>createToken();
    case 2 :
      return ()=>createTokenAcc();
    case 3 :
      return ()=>InitializeMintTo();
    case 4 :
      return ()=> dash();

  }
}

return (
  <TokenSteps 
    step={step}
    id={getId(step)}
    onClick={getOnClick(step)}
  />
)

}

export default TokenCreator