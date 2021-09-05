import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ConnectionProvider } from "./dex/utils/connection";
import { WalletProvider } from "./dex/utils/wallet";
import { AccountsProvider } from "./dex/utils/accounts";
import { CurrencyPairProvider } from "./dex/utils/currencyPair";
import { DexApp } from "./dex/App";  

ReactDOM.render(
  <React.StrictMode>
    <ConnectionProvider>
      <WalletProvider>
        <AccountsProvider>
          <CurrencyPairProvider>
            <App />
            {/* <DexApp /> */}
          </CurrencyPairProvider>
        </AccountsProvider>
      </WalletProvider>
    </ConnectionProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
