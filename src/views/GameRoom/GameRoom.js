import React from "react";
import { useSocket } from "../../context/SocketContext";
import { useAuth } from "../../context/AuthContext.utils";
import { usePlayers } from "../../context/PlayersContext";
import { useTurn } from "../../context/TurnContext";


export default function GameRoom(){
   
    const { players, newPlayer } = usePlayers();
    const { socket, newRoom } = useSocket();
    const { user } = useAuth();
    const { turn, nextTurn  } = useTurn();


    if(players[turn].username ===user.username){
        return <h1>pantalla cantante</h1>
    }
    else{
        return <h1>pantalla listener</h1>
    }
        
    





}