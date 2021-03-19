import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import SearchIcon from "@material-ui/icons/Search";
import "./chats.css";
import { auth, db } from "../firebase";
import Chat from "./Chat";
import { useDispatch, useSelector } from "react-redux";
import { selectuser } from "../features/appSlice";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { useHistory } from "react-router";
import { resetcameraimage } from "../features/cameraslice";

function Chats() {
  const user = useSelector(selectuser);
  const dispatch = useDispatch();
  const [posts, setposts] = useState([]);
  const history = useHistory();
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setposts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, []);
  const signout = () => {
    auth.signOut();
  };
  const takesnap = () => {
    dispatch(resetcameraimage());
    history.push("/");
  };
  return (
    <div>
      <div className="chats">
        <div className="chats__header">
          <Avatar
            src={user.profilepic}
            onClick={signout}
            className="chats__avatar"
          />
          <div className="chats__search">
            <SearchIcon className="chats__searchicon" />
            <input placeholder="Friends" type="text" />
          </div>
          <ChatBubbleOutlineIcon className="chats__chaticon" />
        </div>
        {console.log("post data", posts)}
        <div className="chat__posts">
          {posts.map(
            ({
              id,
              data: { imageUrl, timestamp, read, username, profilepic },
            }) => (
              <Chat
                key={id}
                id={id}
                username={username}
                imageUrl={imageUrl}
                read={read}
                profilepic={profilepic}
                timestamp={timestamp}
              />
            )
          )}
        </div>
        <RadioButtonUncheckedIcon
          onClick={takesnap}
          className="chats__pictakeicon"
          fontsize="large"
        />
      </div>
    </div>
  );
}

export default Chats;
