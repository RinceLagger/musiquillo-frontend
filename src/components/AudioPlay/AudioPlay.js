import React from "react";

export default function AudioPlay({ source }) {
  return (
    <audio src={source} id="play" className="audio-controls" controls></audio>
  );
}

AudioPlay.defaultProps ={
  source:"",
}
