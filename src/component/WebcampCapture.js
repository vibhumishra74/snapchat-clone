import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import { useDispatch } from "react-redux";
import { setcameraimage } from "../features/cameraslice";
import { selectcamera } from "../features/cameraslice";
import { useHistory } from "react-router";
import "./webcampcapture.css";

const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: "user",
};

function WebcampCapture() {
  let dispatch = useDispatch();
  // const cameraimage = useSelector(selectcamera);
  let history = useHistory();
  const webcamRef = useRef(null);
  const capture = useCallback(() => {
    const imagesrc = webcamRef.current.getScreenshot();
    // console.log("images", imagesrc);
    // setimage(imagesrc);
    dispatch(setcameraimage(imagesrc));
    history.push("/preview");
  }, [webcamRef]);
  return (
    <div className="webcampcapture">
      <Webcam
        audio={false}
        height={videoConstraints.height}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={videoConstraints.width}
        videoConstraints={videoConstraints}
      />
      <RadioButtonCheckedIcon
        onClick={capture}
        fontSize="large"
        className="webcampcapture__button"
      />
      {/* <img src={cameraimage} alt="" /> */}
    </div>
  );
}

export default WebcampCapture;
