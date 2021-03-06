import React from "react";

const SocketContext = React.createContext();



function SocketProvider({ children }) {
    const [socket, setSocket] = React.useState(null);

  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      {children}
    </SocketContext.Provider>
  );
}

export default SocketProvider;

export const useSocket = () => React.useContext(SocketContext);