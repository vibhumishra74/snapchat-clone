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

function Preview() {
  let cameraimage = useSelector(selectcamera);
  let history = useHistory();
  let dispatch = useDispatch();
  useEffect(() => {
    if (!cameraimage) {
      history.replace("/");
    }
  }, [cameraimage, history]);
  let closePreview = () => {
    dispatch(resetcameraimage());
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
      <div className="preview__footer">
        <h2>send Now </h2> <SendIcon className="preview__sendicon" />
      </div>
    </div>
  );
}

export default Preview;
