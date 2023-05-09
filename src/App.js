import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './login';
import Logado from './logado';
import Home from './Home';
import ProcuraFirebase from './Procura'
import Desafio from './Desafio';


function App() {
  return (
    <div className="main">
      <Router>
        <Switch>           
          <Route exact path="/" component={ Login} /> 
          <Route exact path="/login" component={ Login} />
          <Route exavt path="/Procura" component={ ProcuraFirebase} />
          <Route exact path="/Desafio" component={ Desafio} />
          <Route exact path="/Home" component={ Home} />
          <Route exact path="/logado" component={ Logado} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
