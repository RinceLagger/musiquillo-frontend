import React from "react";
import { useSocket } from "../../context/SocketContext";
import { useAuth } from "../../context/AuthContext.utils";
import { usePlayers } from "../../context/PlayersContext";
import { useTurn } from "../../context/TurnContext";
import { useCode } from "../../context/CodeContext";
import AudioRecord from "../../components/AudioRecord/AudioRecord";
import { useSongs } from "../../context/SongContext";

export default function GameRoom() {
  const { players, newPlayer } = usePlayers();
  const { socket, newRoom } = useSocket();
  const { user } = useAuth();
  const { turn, nextTurn } = useTurn();
  const [blob, setBlob] = React.useState(null);
  const { code, defineCode } = useCode();
  const [sourcePlay, setSourcePlay] = React.useState(null);
  const [showSend, setShowSend] = React.useState(true);
  const { songs, setSongs  } = useSongs();


  const sendAudio = () =>{
    socket.emit("newAudio", {sourcePlay, roomId: code});
    setShowSend(false);
  }



  if(socket){
    socket.on("newAudio", ({sourcePlay}) => {
        setBlob(sourcePlay);
      });

    
}

  if (players[turn].username === user.username) {
    return (
      <div>
        <h1>Record and Send!</h1>
        {console.log(songs)}
        <h2>Hum the song: {songs[turn].name}</h2>
        <AudioRecord setSourcePlay={setSourcePlay}/>

        {sourcePlay ? (
            <div><audio
            src={sourcePlay}
            id="play"
            className="audio-controls"
            controls
          ></audio>
          {showSend && <button onClick={sendAudio}>Send Audio!</button>}
          
          </div>
          
        ) : (
          <div></div>
        )}

      </div>
    );
  } else {
    return (
      <div>
        <h1>pantalla listener</h1>
        <h2>Guess the song: {songs[turn].hiddenName}</h2>



        {blob ? (
          <audio
            src={blob}
            id="play"
            className="audio-controls"
            controls
          ></audio>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}
