import { Button } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/appSlice";
import { auth, Provider } from "../firebase";
import "./login.css";
const image = window.location.origin + "/snap.png";
function Login() {
  const dispatch = useDispatch();
  const sigin = () => {
    auth
      .signInWithPopup(Provider)
      .then((result) => {
        dispatch(
          login({
            username: result.user.displayName,
            profilepic: result.user.photoURL,
            id: result.user.uid,
          })
        );
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div className="login">
      <div className="login__container">
        <img src={image} alt="" />
        <Button variant="outlined" onClick={sigin}>
          Login
        </Button>
      </div>
    </div>
  );
}
export default Login;
