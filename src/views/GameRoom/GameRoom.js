import React from "react";
import { useSocket } from "../../context/SocketContext";
import { useAuth } from "../../context/AuthContext.utils";
import { usePlayers } from "../../context/PlayersContext";
import { useTurn } from "../../context/TurnContext";
import { useCode } from "../../context/CodeContext";
import AudioRecord from "../../components/AudioRecord/AudioRecord";
import AudioPlay from "../../components/AudioPlay/AudioPlay";
import GenericForm from "../../components/GenericForm/GenericForm";
import { useSongs } from "../../context/SongContext";
import TimeBar from "../../components/TImeBar/TimeBar"
import PlayersPoints from "../../components/PlayersPoints/PlayersPoints"
import { useHistory } from "react-router-dom";

export default function GameRoom() {
  const { players, newPlayer } = usePlayers();
  const { socket, newRoom } = useSocket();
  const { user } = useAuth();
  const { turn, nextTurn } = useTurn();
  const [blob, setBlob] = React.useState(null);
  const { code, defineCode } = useCode();
  const [sourcePlay, setSourcePlay] = React.useState(null);
  const [showSend, setShowSend] = React.useState(true);
  const { songs, setSongs } = useSongs();
  const [enable, setEnable] = React.useState(false);
  const [showTimeBar, setshowTimeBar] = React.useState(false);
  const [flipSong, setflipSong] = React.useState(false);
  let history = useHistory();

  const isSinger = ()=> players[turn].username === user.username;
  

  const checkGuess = (guess) => {

   
    if(guess.toLowerCase()===songs[turn].name.toLowerCase()){ //ACIERTO!!!
      const username = user.username;
      setEnable(true); //no puedes escribir más ya que has acertado
      setflipSong(true); //muestra canción
      socket.emit("point", { username, roomId: code });
    }

  };

  const sendAudio = () => {
    socket.emit("newAudio", { sourcePlay, roomId: code });
    setShowSend(false);
  };

  if (socket) {
    socket.on("newAudio", ({ sourcePlay }) => {
      setBlob(sourcePlay);
      setshowTimeBar(true);
    });
    socket.on("timeOver", () => {
      console.log("timeOver")
      socket.off('newAudio');
      socket.off('updatePoints');
      socket.off('timeOver');
      history.push("/results-room");
    });
    socket.on("updatePoints", ({ players }) => {
      newPlayer(players);
      console.log(players);
    });
  }

  if (isSinger()) {
    return (
      <div>
      <PlayersPoints classname = "ingame-points"/>
       {showTimeBar && <TimeBar/>}
        <h1>Record and Send!</h1>
        {console.log(songs)}
        <h2>Hum the song: { songs[turn].name}</h2>
        <AudioRecord setSourcePlay={setSourcePlay} />

        {sourcePlay && (
          <div>
            <AudioPlay source={sourcePlay} />
            {showSend && <button onClick={sendAudio}>Send Audio!</button>}
            
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div>
      <PlayersPoints classname = "ingame-points"/>
      {showTimeBar && <TimeBar/>}
        <h1>pantalla listener</h1>
        <h2>Guess the song: {!flipSong? <span>{songs[turn].hiddenName}</span> : <span>{songs[turn].name}</span> }</h2>

        {blob? <AudioPlay source={blob}/> : <h3>Waiting for the singer</h3>}
        <GenericForm text= {"Try to guess the song"} btnTxt= {"Guess!"} buttonEnable = {enable} submitAction= {checkGuess}/>
      </div>
    );
  }
}
