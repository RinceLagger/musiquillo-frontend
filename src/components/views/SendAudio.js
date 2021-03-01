import React from "react";
import AudioRecord from "../AudioRecord/AudioRecord";
import InputForm from "../InputForm/InputForm";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:4000/";

export default function SendAudio() {
  const [response, setResponse] = React.useState("");
  const [socket, setSocket] = React.useState(null);
  const [blob, setBlob] = React.useState(null);
  const [sourcePlay, setSourcePlay] = React.useState(null);
  const [roomId, setRoomId] = React.useState("");

  if (socket) {
    socket.on("joinedRoom", (data) => {

      const res = data.msg  
      setResponse(res);
    });
    socket.on("newAudio", ({sourcePlay}) => {

        setBlob(sourcePlay);
      });
  }

  React.useEffect(() => {

    try{
        const socket = socketIOClient(ENDPOINT);
        setSocket(socket);
    }catch(e){
        console.error(e);
    }
    

    
  }, []);

  React.useEffect(() => {
    if(sourcePlay){
        socket.emit("newAudio", {sourcePlay, roomId});

    }

  }, [sourcePlay, roomId]);

  const sendRoomId = (roomId) => {
    socket.emit("join", {roomId});
    setRoomId(roomId);
  };

  return (
    <div>
      <AudioRecord setSourcePlay={setSourcePlay}/>
      <p>{response}</p>
      <InputForm submitAction = {sendRoomId}/>

      {blob?<audio
        src={blob}
        id="play"
        className="audio-controls"
        controls
      ></audio>: <div></div> }
      
    </div>
  );
}
