import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './login';
import Logado from './logado';

function App() {
  return (
    <div className="main">          
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/Logado">
            <Logado />
          </Route> 
          <Route path="/Login">
            <Login />
          </Route>     
          </Switch>
      </Router>
    </div>
  );
}

export default App;
