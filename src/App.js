import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import { app } from "./features/appSlice";
import "./App.css";
import Chats from "./component/chats";
import Chatview from "./component/Chatview";
import Login from "./component/Login";
import Preview from "./component/Preview";
import WebcampCapture from "./component/WebcampCapture";
import { login, logout, selectuser } from "./features/appSlice";
import { auth } from "./firebase";

function App() {
  const user = useSelector(selectuser); //taking user from store
  const dispatch = useDispatch();
  const image = window.location.origin + "/snap.png";
  const iphone = window.location.origin + "/iphone.png";
  useEffect(() => {
    auth.onAuthStateChanged((authuser) => {
      //checking use status
      if (authuser) {
        dispatch(
          login({
            //checking data from store
            username: authuser.displayName,
            profilepic: authuser.photoURL,
            id: authuser.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);
  return (
    <div className="app">
      <BrowserRouter>
        {!user ? (
          <Login />
        ) : (
          <>
            <img src={image} alt="snapchat__logo" className="app__logo" />
            <div className="app__body">
              {/* <img src={iphone} alt="iphone" /> */}
              <div className="app__bodybackground">
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
            </div>
          </>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
