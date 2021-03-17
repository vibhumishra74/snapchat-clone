import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import { app } from "./features/appSlice";
import "./App.css";
import Chats from "./component/chats";
import Chatview from "./component/Chatview";
import Login from "./component/Login";
import Preview from "./component/Preview";
import WebcampCapture from "./component/WebcampCapture";
import { selectuser } from "./features/appSlice";

function App() {
  const user = useSelector(selectuser);
  const dispatch = useDispatch();

  return (
    <div className="app">
      <BrowserRouter>
        {!user ? (
          <Login />
        ) : (
          <div className="app__body">
            <Switch>
              <Route exact={true} path="/">
                <WebcampCapture />
              </Route>
              <Route path="/preview">
                <Preview />
              </Route>
              <Route path="/chat/view">
                <Chatview />
              </Route>
              <Route exact path="/chats">
                <Chats />
              </Route>
            </Switch>
          </div>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
