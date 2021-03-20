import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophoneAlt, faStopCircle } from '@fortawesome/free-solid-svg-icons'
import "./AudioRecord.css"

const microphoneImg = <FontAwesomeIcon icon={faMicrophoneAlt} size="2x"/>
const stopIcon = <FontAwesomeIcon icon={faStopCircle} size="2x"/>

const startButtonStyle = {

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "white",
  border: "2px solid #198FFD",
  borderRadius: "10px",
  height: "42px",
  width: "42px",
};
const stopButtonStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "white",
  border: "2px solid #198FFD",
  borderRadius: "10px",
  height: "42px",
  width: "42px",
};

export default function AudioRecord({ setSourcePlay, setBlob }) {
  const [mediaRecorder, setmediaRecorder] = React.useState({});
  const [startButton, setStartButton] = React.useState(startButtonStyle);
  const [stopButton, setStopButton] = React.useState(stopButtonStyle);

  let chunks = [];

  mediaRecorder.onstart = function (e) {
    chunks = [];
  };

  mediaRecorder.ondataavailable = function (e) {
    chunks.push(e.data);
  };

  mediaRecorder.onstop = function (e) {
    let blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });

    setBlob(blob);
    setSourcePlay(window.URL.createObjectURL(blob));
  };

  React.useEffect(() => {
    let constraints = { audio: true };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (mediaStreamObj) {
        setmediaRecorder(new MediaRecorder(mediaStreamObj));
      });
  }, []);

  const startRecord = () => {
    try {
      const startStyle = {...startButton, backgroundColor:"#4BFF3C"};
      setStartButton(startStyle);
      setStopButton(stopButtonStyle);
      mediaRecorder.start();
      
      console.log(mediaRecorder.state);
    } catch (e) {
      console.error(e);
    }
  };

  const stopRecord = () => {
    try {
      const stopStyle = {...startButton, backgroundColor:"#FF5353"};
      setStopButton(stopStyle);
      setStartButton(startButtonStyle);
      mediaRecorder.stop();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="record-container">
      <button style={startButton} onClick={startRecord}>
        {microphoneImg}
      </button>
      <button style={stopButton} onClick={stopRecord}>
      {stopIcon}
      </button>
    </div>
  );
}
