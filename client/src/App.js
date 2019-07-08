import React from 'react';
import './App.css';
import { Switch, Route } from "react-router-dom";
import Home from "../src/components/home";
import List from "../src/components/list";
import Login from "../src/components/login";

/*
Single page website
Static folder only created for 1 url layer
*/

function App() {
  return (
    <div className="App">
      <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/lemmein" component={Home} />
          <Route path="/:id" component={List} />
      </Switch>

      <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
    </div>
  );
}

export default App;
