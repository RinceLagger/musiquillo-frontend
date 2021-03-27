import React from "react";
import { useSocket } from "../../context/SocketContext";
import disconnectGif from "../../assests/images/disconnection.gif";
import { useHistory } from "react-router-dom";

const Disconnection = () => {
  let history = useHistory();
  const { socket } = useSocket();

  if(socket){
    socket.disconnect(true);
  }

  React.useEffect(() => {
    

    setTimeout(() => {
      history.push("/room-menu");
    }, 5000);
  }, [history]);



  return (<>
  <h1 style={{color: "#198ffd", fontSize: "20px" }}>A player has disconnected from the game </h1>
  <img src={disconnectGif} alt="404" /></>);
};

export default Disconnection;
