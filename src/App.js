import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route,Switch,Link,Redirect} from "react-router-dom";



//Pages
import DashBoard from './pages/dashboard';
import NotFoundPage from './pages/404';
import PricePage from './pages/prices';
class App extends Component{
  render() {
    return (
    <Router>
      <Switch>
        <Route exact path="/News" component={DashBoard} />   
        <Route exact path="/Prices" component={PricePage} />
        <Route exact path='/404' component={NotFoundPage} />
        <Redirect to= "/Prices"/>
      </Switch>
    </Router>
    )
  } 
}


export default App;
