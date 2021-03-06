import React from "react";

const SocketContext = React.createContext({});



function SocketProvider({ children }) {
    const [socket, setSocket] = React.useState(null);

    const newRoom = (newsocket) =>{
        setSocket(newsocket);
    }


  return (
    <SocketContext.Provider value={{ socket, newRoom }}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;

export function useSocket() {
    return React.useContext(SocketContext);
  }