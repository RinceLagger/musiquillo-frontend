import React from "react";
import { useAuth } from "../../context/AuthContext.utils";

export default function Header(){

    const { user,handleLogout } = useAuth();


    return(
        <div>
            <img src="" alt="profile-pic"/>
            <h2>hola, {user.username}</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}



