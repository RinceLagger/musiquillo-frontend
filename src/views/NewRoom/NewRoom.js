import React from "react";
import socketIOClient from "socket.io-client";
import { useSocket } from "../../context/SocketContext";
import { useAuth } from "../../context/AuthContext.utils";
import { usePlayers } from "../../context/PlayersContext";
const ENDPOINT = "http://localhost:4000/";

function getRandom(){
    return String(Math.floor(Math.random() * 100000)); 
}

export default function NewRoom(){

    const [codigo, setCodigo] = React.useState("");
    const {players, newPlayer} = usePlayers();
    const {socket, newRoom} = useSocket();
    const { user} = useAuth();

    if(socket){
        socket.on("players", ({players}) => {
            newPlayer(players);
            console.log(players);
          });

          socket.on("duplicatedRoom", () => {

            console.log("duplicatedRoom");
          });
    }
   
    //console.log(useSocket)

    React.useEffect(()=>{
        
        const random = getRandom();
        setCodigo(random);

    },[])

    React.useEffect(()=>{
        
        if(codigo){
            const socket = socketIOClient(ENDPOINT);
            newRoom(socket);
            const username = user.username;
            socket.emit("join", { username, roomId: codigo})
        }

    },[codigo])


    return(
        
        <div>
            <p>Copia y comparte el código! <span>{codigo}</span></p>
            <h1>Connected Players:</h1>
            <ul>{players.map((player)=> <li key = {player._id}>{player.username}</li>)}
            </ul>
        </div>
    )
}