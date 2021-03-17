import React, { useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { selectselectedimage } from "../features/appSlice";
import "./chatview.css";

function Chatview() {
  const selectimage = useSelector(selectselectedimage);
  const history = useHistory();
  useEffect(() => {
    if (!selectimage) {
      exit();
    }
  }, [selectimage]);
  const exit = () => {
    history.replace("/chats");
  };
  return (
    <div className="chatview">
      <img src={selectimage} onClick={exit} alt="" />
      <div className="chatview__timer">
        <CountdownCircleTimer
          isPlaying
          duration={10}
          strokeWidth={6}
          size={50}
          colors={[
            ["#004777", 0.33],
            ["#f7BB01", 0.33],
            ["#A30000", 0.033],
          ]}
        >
          {({ remainingTime }) => {
            if (remainingTime === 0) {
              exit();
            }
          }}
        </CountdownCircleTimer>
      </div>
    </div>
  );
}

export default Chatview;
