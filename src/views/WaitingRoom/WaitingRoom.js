import React from "react";

import { useSocket } from "../../context/SocketContext";
import { usePlayers } from "../../context/PlayersContext";
//import { useAuth } from "../../context/AuthContext.utils";
import { useTurn } from "../../context/TurnContext";
import { useHistory } from "react-router-dom";
import { useSongs } from "../../context/SongContext";
function WaitingRoom(){

    let history = useHistory();
    const {socket} = useSocket();
    const {players, newPlayer} = usePlayers();
    const { nextTurn  } = useTurn();
    
    const { defineSongs  } = useSongs();

    if(socket){
        socket.on("players", ({players}) => {
            newPlayer(players);
            
          });
        
          socket.on("start", ({turn, songs}) => {
            console.log("start");
            nextTurn(turn);
            defineSongs(songs);
            socket.off('players');
            socket.off('start');
            console.log("turno: ", turn);
            history.push("/game-room");
          });
    }



    return(
        <div>
        <h1>Connected Players:</h1>
        <ul>{players.map((player)=> <li key = {player._id}>{player.username}</li>)}
        </ul>
        </div>
    )

}

export default WaitingRoom;