import React from 'react';
import './App.css';
import {Route,Switch} from "react-router-dom"
import Join from "./pages/Join"
import Chat from "./pages/Chat"

function App() {



  return (
    <Switch>
      <Route exact path="/join">
          <Join />
      </Route>
      <Route path="/chat">
          <Chat/>
      </Route>
    </Switch>
  );
}

export default App;
