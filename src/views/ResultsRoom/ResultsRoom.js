import React from "react";
import PlayersPoints from "../../components/PlayersPoints/PlayersPoints"
import { useSocket } from "../../context/SocketContext";
import { useTurn } from "../../context/TurnContext";
import { useCode } from "../../context/CodeContext";
import { useHistory } from "react-router-dom";


export default function ResultsRoom() {



    return(
        <div>
            <h1>Ranking actual: </h1>
            <PlayersPoints classname = "results-points"/>
        </div>
        
    )


}