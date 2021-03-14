import React from "react";
import { usePlayers } from "../../context/PlayersContext";

export default function PlayersPoints (){

    const { players} = usePlayers();


    return(
        <ul>{players.map((player)=> <li key = {player._id}>
        <span>{player.username} </span>
        <span>Points: {player.points}</span></li>)}
        </ul>
    )

}