import React from "react";

export default function AudioRecord({setSourcePlay}) {
  //const [source, setSource] = React.useState(null);
  //const [sourcePlay, setSourcePlay] = React.useState(null);
  //const [chunks, setChunks] = React.useState([]);
  const [mediaRecorder, setmediaRecorder] = React.useState({});

  let chunks = [];

  mediaRecorder.onstart = function (e) {
    chunks = [];
  };

  mediaRecorder.ondataavailable = function (e) {
    console.log(e);

    chunks.push(e.data);
  };

  mediaRecorder.onstop = function (e) {
    let blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
    setSourcePlay(window.URL.createObjectURL(blob));
    console.log(blob);
  };

  React.useEffect(() => {
    let constraints = { audio: true };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (mediaStreamObj) {
        //setSource(mediaStreamObj);

        setmediaRecorder(new MediaRecorder(mediaStreamObj));
      });
  }, []);

  const startRecord = () => {
    try {
      mediaRecorder.start();
      console.log(mediaRecorder.state);
    } catch (e) {
      console.error(e);
    }
  };

  const stopRecord = () => {
    try {
      //console.log(mediaRecorder.requestData())
      mediaRecorder.stop();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      {console.log(mediaRecorder)}
      <button id="start-record" onClick={startRecord}>
        Start Recording
      </button>
      <button id="stop-record" onClick={stopRecord}>
        Stop Recording
      </button>
      {/* <button id="play" onClick = {playRecord}>Start Playing</button>
            <button id="stop" onClick = {stopRecord}>Stop Playing</button> */}

      {/* <audio src={source} id="record" className = "audio-controls" controls></audio> */}
      {/* <audio
        src={sourcePlay}
        id="play"
        className="audio-controls"
        controls
      ></audio> */}
    </div>
  );
}
