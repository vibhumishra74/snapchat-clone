import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { selectcamera, resetcameraimage } from "../features/cameraslice";
import CloseIcon from "@material-ui/icons/Close";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import CreateIcon from "@material-ui/icons/Create";
import NoteIcon from "@material-ui/icons/Note";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import CropIcon from "@material-ui/icons/Crop";
import TimerIcon from "@material-ui/icons/Timer";
import SendIcon from "@material-ui/icons/Send";
import "./preview.css";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import firebase from "firebase";
import { selectuser } from "../features/appSlice";

function Preview() {
  let cameraimage = useSelector(selectcamera);
  let history = useHistory();
  let dispatch = useDispatch();
  let user = useSelector(selectuser);
  useEffect(() => {
    if (!cameraimage) {
      history.replace("/");
    }
  }, [cameraimage, history]);
  let closePreview = () => {
    dispatch(resetcameraimage());
  };
  const sendpost = () => {
    const id = uuid();
    const uploadtask = storage
      .ref(`posts/${id}`)
      .putString(cameraimage, "data_url");
    uploadtask.on(
      "stage_change",
      // null for progress fumction
      null,
      //error function
      (error) => {
        alert(error);
      },
      () => {
        //complet function getting url from storage into collection
        storage
          .ref("posts")
          .child(id)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              //taking data from store
              imageUrl: url,
              username: user.username,
              read: false,
              profilepic: user.profilepic,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            history.replace("/chats");
          });
      }
    );
  };
  return (
    <div className="preview">
      {/* <h1>hii preview :)</h1> */}
      <div className="preview__toolbarright">
        <TextFieldsIcon />
        <CreateIcon />
        <NoteIcon />
        <MusicNoteIcon />
        <AttachFileIcon />
        <CropIcon />
        <TimerIcon />
      </div>
      <CloseIcon className="preview__close" onClick={closePreview} />
      <img src={cameraimage} alt="" />
      <div className="preview__footer" onClick={sendpost}>
        <h2>send Now </h2> <SendIcon className="preview__sendicon" />
      </div>
    </div>
  );
}

export default Preview;
