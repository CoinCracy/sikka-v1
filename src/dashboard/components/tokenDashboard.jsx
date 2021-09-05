import React, { useEffect, useState } from "react";
import {useParams} from 'react-router-dom'
import TransferModal from './Utility/Transfer' 
import MintModal from './Utility/Mint' 
import FreezeModal from './Utility/Freeze' 
import BurnModal from './Utility/Burn'


const getProvider = () => {
    if ("solana" in window) {
      const provider = (window).solana;
      if (provider.isPhantom) {
        return provider;
      }
    }
  };
  
  


function TokenDashboard(props) {

    const provider = getProvider();

    const { id } = useParams();

    useEffect(()=> {

    })
return (
    <div>
        <TransferModal provider={provider} mintAddress = { id }/>
        <MintModal provider={provider} mintAddress = { id }/>
        <FreezeModal provider={provider} mintAddress = { id }/>
        <BurnModal provider={provider} mintAddress = { id }/>
    </div>
)
}

export default TokenDashboard