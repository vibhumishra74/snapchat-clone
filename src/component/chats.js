import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import SearchIcon from "@material-ui/icons/Search";
import "./chats.css";
import { auth, db } from "../firebase";
import Chat from "./Chat";
import { useSelector } from "react-redux";
import { selectuser } from "../features/appSlice";

function Chats() {
  const user = useSelector(selectuser);
  const [posts, setposts] = useState([]);
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
  return (
    <div>
      <div className="chats">
        <div className="chats__header">
          <Avatar
            src={user.profilepic}
            onClick={signout}
            className="chat__avatar"
          />
          <div className="chats__search">
            <SearchIcon />
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
      </div>
    </div>
  );
}

export default Chats;
