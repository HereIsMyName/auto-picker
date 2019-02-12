import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import TopContainer from "./components/top-container";
import Side from "./components/sidebar";
import Home from "./components/home";
import About from './components/about';
import CarFinderPage from "./components/car-finder/carFinderPage";
import CarAdder from './components/carAdder';
import SigninPage from './components/signinPage';
import SignupPage from './components/signupPage';
import Account from './components/account';
import Cars from './components/cars.js';
import CarModels from './components/vehicles/carModels'
import Err from "./components/error";
import './styles/main.css'


class App extends Component {
  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div>
          <TopContainer />
          <Side />
          <div id='mainContent'>
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/about" component={About}/>
              <Route path="/selections" component={CarAdder} />
              <Route path="/signin" component={SigninPage} />
              <Route path="/signup" component={SignupPage} />
              <Route path='/account' component={Account} />
              <Route path="/car-finder" component={CarFinderPage} />
              <Route path="/cars" component={Cars} exact/>
              <Route path="/cars/:carModel" component={CarModels} /> 
              <Route component={Err} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
