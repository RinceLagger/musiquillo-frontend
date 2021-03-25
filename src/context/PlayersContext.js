import React from "react";

const PlayersContext = React.createContext({});



function PlayersProvider({ children }) {
    const [players, setPlayers] = React.useState([]);

    const newPlayer = (players) =>{
        // console.log(players)
        setPlayers(players);
    }


  return (
    <PlayersContext.Provider value={{ players, newPlayer }}>
      {children}
    </PlayersContext.Provider>
  );
}

export default PlayersProvider;

export function usePlayers() {
    return React.useContext(PlayersContext);
  }