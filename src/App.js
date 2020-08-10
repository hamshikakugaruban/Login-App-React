import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {  Switch, Route } from "react-router-dom";

import Login from "./components/Login";
import SignUp from "./components/Register";
import Index from "./components/Index";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/sign-in" component={Login} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/index" component={Index} />
      </Switch>
    </div>
  );
}

export default App;
