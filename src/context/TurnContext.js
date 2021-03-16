import React from "react";

const TurnContext = React.createContext({});



function TurnProvider({ children }) {
    const [turn, setTurn] = React.useState(0);

    const nextTurn = (turn) =>{
      setTurn(turn);
    }


  return (
    <TurnContext.Provider value={{ turn, nextTurn }}>
      {children}
    </TurnContext.Provider>
  );
}

export default TurnProvider;

export function useTurn() {
    return React.useContext(TurnContext);
  }