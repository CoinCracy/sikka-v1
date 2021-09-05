import React, { useState, useEffect } from 'react';
import  "../CSS/fanCoinPage.scss"

const FanCoinPage = ({
    onClick = () => {}
}) => {
    return (
        <div className= 'formContainer'>
          <div className = "formBlock" >
                <p className="label">Name</p>
                <input className ="decimals name" placeholder= "Enter full name of the coin" type="text"></input>
          </div>
          <div className = "formBlock" >
                <p className="label">Syntax</p>
                <input className ="decimals syntax"  placeholder= "BTC for Bitcoin" type="text"></input>
          </div>
          <div className = "footerClass" >
                <div className='formBlock'>
                    <p className="label">Total supply</p>
                    <input className ="decimals totalSupply"  placeholder= "Circulated coins no." type="text"></input>
                </div>
                <div className='formBlock'>
                    <p className="label">Decimal</p>
                    <input className ="decimals decimal" placeholder= "Lowest decimal" type="text"></input>
                </div>
          </div>
          <button  className = "conect-button"  onClick={ onClick }>Connect wallet</button>
        </div>
    )
    
};

export default FanCoinPage;
