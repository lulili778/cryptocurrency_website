import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route,Switch,Link,Redirect} from "react-router-dom";



//Pages
import DashBoard from './pages/dashboard';
import NotFoundPage from './pages/404';
import PricePage from './pages/prices';
import Playground from './pages/playground';
class App extends Component{
  render() {
    return (
    <Router>
      <Switch>
        <Route exact path="/News" component={DashBoard} />   
        <Route exact path="/Prices" component={PricePage} />
        <Route exact path='/404' component={NotFoundPage} />
        <Redirect to= "/Prices"/>
        <Route exact path="/playground" component={Playground} />
      </Switch>
    </Router>
    )
  } 
}


export default App;
