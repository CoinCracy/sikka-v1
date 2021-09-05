import { HashRouter, Route } from "react-router-dom";
import React from "react";
import { ExchangeView } from "./components/exchange";
import App from "../dex/App";

export function Routes() {
  // TODO: add simple view for sharing ...
  return (
    <>
      <HashRouter basename={"/"}>
        <Route exact path="/" component={ExchangeView} />
      </HashRouter>
    </>
  );
}
