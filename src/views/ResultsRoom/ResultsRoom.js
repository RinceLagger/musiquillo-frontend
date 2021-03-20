import React from "react";
import PlayersPoints from "../../components/PlayersPoints/PlayersPoints"
import { useSocket } from "../../context/SocketContext";
import { useTurn } from "../../context/TurnContext";
import { useCode } from "../../context/CodeContext";
import { useHistory } from "react-router-dom";
import { usePlayers } from "../../context/PlayersContext";
import { useAuth } from "../../context/AuthContext.utils";


export default function ResultsRoom() {

    let history = useHistory();
    const { socket } = useSocket();
    const { turn, nextTurn } = useTurn();
    const { code} = useCode();
    const { players } = usePlayers();
    const { user } = useAuth();


    const isSinger = ()=> {
        return players[turn].username === user.username;
       }

    if (socket) {
        socket.on("nextRound", ({ turno }) => {
            console.log(turno)
            nextTurn(turno);
            history.push("/game-room");
          });
          socket.on("showWinner", () => {
            
            
            history.push("/winner-room");
          });

    }

    React.useEffect(()=>{
        if(isSinger()){
            const numPlayers = players.length;
            socket.emit("nextRound", {  roomId: code,numPlayers });
        }
        

    }, []);

    return(
        <div>
            <h1>Ranking actual: </h1>
            <PlayersPoints styleName = {{playersStyle:"results-points"}}/>
        </div>
        
    )


}