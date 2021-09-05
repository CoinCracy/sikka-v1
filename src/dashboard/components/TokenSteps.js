import React, { useState, useEffect } from 'react';
import  "../CSS/token.css"

const TokenSteps = ({
    id,
    step,
    onClick=()=>{},
}) => {
    const findStep = () => {
        switch(step) {
            case 1:
                return  <>
                           <input id="name" className = "name" placeholder= "Name" type="text"></input>
                           <input id="symbol" className = "symbol" placeholder= "symbol" type="text"></input>
                            <input id="decimals" className = "decimals" placeholder= "Decimals" type="text"></input>
                            <button className = "decimals-button" onClick={ onClick } >Create Token </button>
                        </>
            case 2:
                return  <button className = "initialization-button" onClick={ onClick } > Initialize A Token Account </button>
            case 3:
                return  <>
                            <input id="token-supply"  className = "decimals" placeholder= "Token Supply" type="text"></input>
                            <button className = "decimals-button" onClick={() =>  onClick()} > Mint Tokens</button>
                        </>
            case 4: 
                return  <button  className = "decimals-button"  onClick={ onClick }> Dashboard</button>

            default:
          }

    }

    return (
        <div id="create-token">
          <div className = "step" id={`${id}`}>
              {findStep()}
          </div>
        </div>
    )
    
};

export default TokenSteps;
