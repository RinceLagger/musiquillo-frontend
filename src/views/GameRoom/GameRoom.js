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
import TimeBar from "../../components/TImeBar/TimeBar";
import PlayersPoints from "../../components/PlayersPoints/PlayersPoints";
import ChatBox from "../../components/ChatBox/ChatBox";
import { useHistory } from "react-router-dom";

import "./GameRoom.css";

const initialSongStyle = {
  position: "absolute",
  top: "21%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "white",
  border: "2px solid #198FFD",
  borderRadius: "10px",
  height: "50px",
  width: "80%",
  maxWidth: "800px",
};

export default function GameRoom() {
  const { players, newPlayer } = usePlayers();
  const { socket } = useSocket();
  const { user } = useAuth();
  const { turn } = useTurn();
  const [blob, setBlob] = React.useState(null);
  const { code } = useCode();
  const [sourcePlay, setSourcePlay] = React.useState(null);
  const [showSend, setShowSend] = React.useState(true);
  const { songs } = useSongs();
  const [enable, setEnable] = React.useState(false);
  const [showTimeBar, setshowTimeBar] = React.useState(false);
  const [flipSong, setflipSong] = React.useState(false);
  const [songStyle, setSongStyle] = React.useState(initialSongStyle);

  let history = useHistory();

  const isSinger = () => {
    return players[turn].username === user.username;
  };

  const checkGuess = (guess) => {
    const username = user.username;
    if (guess.toLowerCase() === songs[turn].name.toLowerCase()) {
      //ACIERTO!!!

      setEnable(true); //no puedes escribir más ya que has acertado
      setflipSong(true); //muestra canción
      const songStyle = { ...initialSongStyle, backgroundColor: "#4BFF3C" };
      setSongStyle(songStyle);
      setTimeout(() => {
        setSongStyle(initialSongStyle);
      }, 500);

      socket.emit("point", { username, roomId: code, turn });
    } else {
      socket.emit("wrongGuess", { username, guess, roomId: code });

      const songStyle = { ...initialSongStyle, backgroundColor: "#FF5353" };
      setSongStyle(songStyle);
      setTimeout(() => {
        setSongStyle(initialSongStyle);
      }, 300);
    }
  };

  const sendAudio = () => {
    socket.emit("newAudio", { blob, roomId: code });

    setShowSend(false);
  };

  if (socket) {
    socket.on("newAudio", ({ blob: newBlob }) => {
      let blob = new Blob([newBlob], { type: "audio/ogg; codecs=opus" });
      const src = window.URL.createObjectURL(blob);
      setBlob(src);
      setshowTimeBar(true);
    });
    socket.on("timeOver", () => {
      socket.off("newAudio");
      socket.off("updatePoints");
      socket.off("timeOver");
      socket.off("wrongGuess");
      history.push("/results-room");
    });
    socket.on("updatePoints", ({ players }) => {
      newPlayer(players);
    });
    socket.on("disconnection", () => {
      // socket.disconnect(true);
      history.push("/disconnect");
    });
  }

  if (isSinger()) {
    return (
      <div className="game-container">
        {showTimeBar && <TimeBar />}
        <PlayersPoints styleName={{ playersStyle: "ingame-points" }} />
        <div style={songStyle}>
          <h2
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "20px",
            }}
          >
            <span id="song">Hum the song:&nbsp;&nbsp; &nbsp;</span>
            <span id="song">{songs[turn].name}</span>
          </h2>
        </div>
        {sourcePlay && (
          <div className="play-container">
            <AudioPlay source={sourcePlay} />
            {showSend && (
              <button className="primary" onClick={sendAudio}>
                Send!
              </button>
            )}
          </div>
        )}

        <AudioRecord setSourcePlay={setSourcePlay} setBlob={setBlob} />
        <ChatBox />
      </div>
    );
  } else {
    return (
      <div className="game-container">
        {showTimeBar && <TimeBar />}
        <PlayersPoints styleName={{ playersStyle: "ingame-points" }} />

        <div style={songStyle}>
          <h2
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "20px",
            }}
          >
            <span id="song">Guess the song:&nbsp;&nbsp;&nbsp; </span>

            {!flipSong ? (
              <span id="song">{songs[turn].hiddenName}</span>
            ) : (
              <span id="song">{songs[turn].name}</span>
            )}
          </h2>
        </div>
        <div className="play-container">
          {blob ? <AudioPlay source={blob} /> : <h3 id="waiting">Waiting for the singer <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></h3>}
        </div>
        <ChatBox />
        <div className="container-guess">
          <GenericForm
            text={"Try to guess the song"}
            btnTxt={"Guess!"}
            buttonEnable={enable}
            submitAction={checkGuess}
          />
        </div>
      </div>
    );
  }
}
