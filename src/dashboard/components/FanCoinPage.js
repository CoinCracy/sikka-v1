import { Input } from 'antd';
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
          <div>
                <p className="label2">Syntax</p>
                <input className ="decimals syntax"  placeholder= "BTC for Bitcoin" type="text"></input>
          </div>
          

          <div className='formBlock'>
                    <p className="label3">Social links (at least one is compulsory).</p>
                    <Input placeholder= "Facebook Link" type="text"></Input><br/>
                    <Input placeholder= "Instagram Link" type="text"></Input><br/>
                    <Input placeholder= "Twitter Link" type="text"></Input><br/>
                    <Input placeholder= "Youtube Link" type="text"></Input>
                </div>
                <br/>
          <button  className = "conect-button"  onClick={ onClick }>Connect wallet</button>
        </div>
    )
    
};

export default FanCoinPage;
