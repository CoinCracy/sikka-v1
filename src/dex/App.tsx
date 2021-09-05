import React from "react";
import "./App.scss";
import { WalletProvider } from "./utils/wallet";
import { ConnectionProvider } from "./utils/connection";
import { AccountsProvider } from "./utils/accounts";
import { CurrencyPairProvider } from "./utils/currencyPair";
import { Routes } from "./routes";
import { ExchangeView } from "./components/exchange";

export function DexApp() {
  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default DexApp;
