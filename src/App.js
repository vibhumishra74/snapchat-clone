import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import { app } from "./features/appSlice";
import "./App.css";
import Preview from "./component/Preview";
import WebcampCapture from "./component/WebcampCapture";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <div className="app__body">
          <Switch>
            <Route exact={true} path="/">
              <WebcampCapture />
            </Route>
            <Route path="/preview">
              <Preview />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
