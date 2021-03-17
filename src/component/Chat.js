import { Avatar } from "@material-ui/core";
import StopIcon from "@material-ui/icons/Stop";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import ReactTimeago from "react-timeago";
import { selectimage } from "../features/appSlice";
import { db } from "../firebase";
import "./chat.css";

function Chat({ id, imageUrl, timestamp, read, username, profilepic }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const open = () => {
    if (!read) {
      dispatch(selectimage(imageUrl));
      db.collection("posts").doc(id).set(
        {
          read: true,
        },
        {
          merge: true,
        }
      );
      history.push("/chat/view");
    }
  };
  return (
    <div className="chat" onClick={open}>
      <Avatar src={profilepic} className="chat__avatar" />
      <div className="chat__info">
        <h4> {username} </h4>
        <p>
          {" "}
          {!read && "Tap to View -"}{" "}
          <ReactTimeago date={new Date(timestamp?.toDate()).toLocaleString()} />{" "}
        </p>
      </div>
      {!read && <StopIcon className="chat__readicon" />}
    </div>
  );
}

export default Chat;
