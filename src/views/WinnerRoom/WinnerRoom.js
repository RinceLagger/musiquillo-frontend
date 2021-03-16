import React from "react";
import { useSocket } from "../../context/SocketContext";
import { usePlayers } from "../../context/PlayersContext";
import { useTurn } from "../../context/TurnContext";
import { useCode } from "../../context/CodeContext";
import { useSongs } from "../../context/SongContext";
import { useHistory } from "react-router-dom";


export default function WinnerRoom() {
    let history = useHistory();
    const { players, newPlayer } = usePlayers();
    const [winner, setWinner] = React.useState({});
    const { newRoom } = useSocket();
    const { nextTurn } = useTurn();
    const { defineCode } = useCode();
    const { defineSongs } = useSongs();


    const resetGameContext = ()=> {
        //Reiniciamos contextos al finalizar el juego
        newPlayer([]);
        newRoom(null);
        nextTurn(0);
        defineCode("");
        defineSongs([]);
    }

    const findWinner = () => {
        let winnerName = players[0].username;
        let winnerPoints = players[0].points;
        players.forEach((player)=>{
            if(player.points> winnerPoints){
                winnerName = player.username;
                winnerPoints = player.points;
            }
        });

        return {
            winnerName, winnerPoints
        }
    }

    React.useEffect(()=>{
        const ganador = findWinner();
        setWinner(ganador);

        resetGameContext();
        
        setTimeout(() => {
            history.push("/room-menu");
          }, 10000);
    },[])

    return(<h1>El ganador es: {winner.winnerName}!!!!</h1>)


}