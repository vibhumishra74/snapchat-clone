import { Button } from "@material-ui/core";
import React from "react";
import "./login.css";
const image = window.location.origin + "snap.png";
function Login() {
  return (
    <div>
      <img src={image} alt="" />
      <Button>Login</Button>
    </div>
  );
}
export default Login;
