// ./src/components/ControlPanel/ControlPanel.js
import React from "react";

function ControlPanel({ playAudio, isMuted, toggleMute }) {
  return (
    <div className="control-panel">
      <i className="fa fa-play" onClick={playAudio}></i>
      <i 
        className={`fa ${isMuted ? "fa-volume-off" : "fa-volume-up"}`}
        onClick={toggleMute}
      ></i>
    </div>
  );
}

export default ControlPanel;
