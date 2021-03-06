import React from "react";
import socketIOClient from "socket.io-client";
import { useSocket } from "../../context/SocketContext";
const ENDPOINT = "http://localhost:4000/";

function getRandom(){
    return Math.floor(Math.random() * 100000); 
}

export default function NewRoom(){

    const [codigo, setCodigo] = React.useState("");
    
    const {socket, newRoom} = useSocket();
   
    //console.log(useSocket)

    React.useEffect(()=>{
        
        const random = getRandom();
        setCodigo(random);

    },[])

    React.useEffect(()=>{
        
        if(codigo){
            const socket = socketIOClient(ENDPOINT);
            newRoom(socket);

        }

    },[codigo])


    return(
        
        <div>
            <p>Copia y comparte el código! <span>{codigo}</span></p>
        </div>
    )
}