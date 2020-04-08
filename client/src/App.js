import React from 'react';
import './App.css';
import { Switch, Route } from "react-router-dom";
import withAuth from './components/auth/withAuth';
import Home from "../src/components/home";
import List from "../src/components/list";
import Login from "./components/auth/login";

/*
Single page website
Static folder only created for 1 url layer
*/

function App() {
  return (
    <div className="App">
      <Switch>
          <Route path="/" exact component={withAuth(Home)} />
          <Route path="/login" exact component={Login} />
          <Route path="/:id" component={withAuth(List)} />
      </Switch>
    </div>
  );
}

export default App;
