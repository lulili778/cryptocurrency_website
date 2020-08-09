import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route,Switch,Link,Redirect} from "react-router-dom";



//Pages
import DashBoard from './pages/dashboard';
import NotFoundPage from './pages/404';
import PricePage from './pages/prices';
import Playground from './playground/playground';
// import Prices_hook from './price_hook/playground';
import Prices_hook from './pages/prices_hook';
import All_crytocurrency from './pages/allcryptos'
import Compare from './pages/compare'

class App extends Component{
  render() {
    return (
    <Router>
      <Switch>
        <Route exact path="/News" component={DashBoard} />   
        <Route exact path="/Prices" component={Prices_hook} />
        <Route exact path='/404' component={NotFoundPage} />
        <Route exact path="/playground" component={Playground} />
        <Route exact path="/pricehook" component={Prices_hook} />
        <Route exact path="/" component={Prices_hook} />
        <Route exact path="/All" component={All_crytocurrency} />
        <Route exact path="/compare" component={Compare} />


        <Redirect to= "/pricehook"/>
      </Switch>
    </Router>
    )
  } 
}


export default App;
