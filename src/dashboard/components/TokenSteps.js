import React, { useState, useEffect } from 'react';
import  "../CSS/token.css"
import { Input } from 'antd';
import Button from '@material-ui/core/Button';
import Text from 'antd/lib/typography/Text';
import ActionButton from 'antd/lib/modal/ActionButton';
const TokenSteps = ({
    id,
    step,
    onClick=()=>{},
}) => {
    const findStep = () => {
        switch(step) {
            case 1:
                return  <>
                    <Button variant="contained">Step 1</Button> <br/>
                    <p><Text>Create your token</Text></p>
                           <Input id="name" className = "name" placeholder= "Name" type="text"></Input><br/>
                           <Input id="symbol" className = "symbol" placeholder= "Symbol" type="text"></Input><br/>
                            <Input id="decimals" className = "decimals" placeholder= "Decimals" type="text"></Input><br/>
                            <button variant="contained" color="primary" className = "decimals-button" onClick={  onClick } >Create Token </button>
                        </>
            case 2:

                return  <>
                        <Button variant="contained">Step 2</Button> <br/>
                        <Button variant="contained" color="primary" className ="initialization-button" onClick={ onClick } > Initialize A Token Account </Button>        
                        </>
            case 3:
                return  <>
                            <Button variant="contained">Step 3</Button> <br/>            
                            <Input id="token-supply"  className = "decimals" placeholder= "Token Supply" type="text"></Input><br/>
                            <Button variant="contained" color="primary" className = "decimals-button" onClick={() =>  onClick()} > Mint Tokens</Button>
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
