import { Token } from '@solana/spl-token';
import React ,{ useState , useEffect} from 'react'
import './App.scss';

import {BrowserRouter as Router, Redirect,  Switch, Route,Link} from "react-router-dom";

import TokenCreator from './dashboard/components/token.jsx';
import SikkaLandingPage from './dashboard/components/SikkaLandingPage.js';
import Connect from './dashboard/components/Wallet';
import Dashboard from './dashboard/components/Dashboard.jsx';
import TokenDashboard from './dashboard/components/tokenDashboard';
import {ExchangeView} from './dex/components/exchange';
import Home from './dashboard/components/Home';
import Navbar from './dashboard/components/Navbar';

function App() {

const [ provider, setProvider ] = useState() 
const [token , setToken ] = useState({ mintAddress : null , accountAddress : null })


return (
   <>
<Router>
   <Route exact path='/'>
      <Navbar />
      <Home />
   </Route> 
</Router>
<Router>
      <Connect setProvider = {setProvider}/>
   <Route exact path='/app'>
      <SikkaLandingPage  setToken=  {setToken} provider = {provider}/>
   </Route>
   <Route exact path='/dashboard'>
      <Dashboard provider = {provider} />
   </Route>
   <Route exact path='/dashboard/:id'>
      <TokenDashboard/>
   </Route>
   <Route exact path="/dex">
      <ExchangeView/>
   </Route>
</Router>
</>
  );
}

export default App;
