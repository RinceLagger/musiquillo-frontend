import React from "react";
import AudioRecord from "../AudioRecord/AudioRecord";
import InputForm from "../InputForm/InputForm";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:4000/";

export default function SendAudio() {
  const [response, setResponse] = React.useState("");
  const [socket, setSocket] = React.useState(null);

  if (socket) {
    socket.on("joinedRoom", (data) => {

      const res = data.msg  
      setResponse(res);
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

  const sendRoomId = (roomId) => {
    socket.emit("join", {roomId});
  };

  return (
    <div>
      <AudioRecord />
      <p>{response}</p>
      <InputForm submitAction = {sendRoomId}/>
    </div>
  );
}
