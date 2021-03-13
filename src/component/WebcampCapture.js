import React, { useCallback, useRef } from "react";
import Webcam from "react-webcam";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";

const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: "user",
};
function WebcampCapture() {
  const webcamRef = useRef(null);
  const capture = useCallback(() => {
    const imagesrc = webcamRef.current.getScreenshot();
    console.log("images", imagesrc);
  }, [webcamRef]);
  return (
    <div>
      <Webcam
        audio={false}
        height={videoConstraints.height}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={videoConstraints.width}
        videoConstraints={videoConstraints}
      />
      <RadioButtonCheckedIcon onClick={capture} fontSize="large" />
    </div>
  );
}

export default WebcampCapture;
