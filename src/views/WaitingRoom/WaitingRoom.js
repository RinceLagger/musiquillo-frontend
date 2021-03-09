import React from "react";

import { useSocket } from "../../context/SocketContext";
import { usePlayers } from "../../context/PlayersContext";
import { useAuth } from "../../context/AuthContext.utils";
import { useTurn } from "../../context/TurnContext";
import { useHistory } from "react-router-dom";

function WaitingRoom(){

    
    const {socket} = useSocket();
    const {players, newPlayer} = usePlayers();

    if(socket){
        socket.on("players", ({players}) => {
            newPlayer(players);
            
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