import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useSocket } from "../context/SocketContext";

function GameRoute({ component: Component, exact, path, ...props }) {
  
  const { socket } = useSocket();
  
  if (!socket) {
    return <Redirect to="/room-menu" />;
  }

  return (
    <Route exact path={path}>
      <Component {...props} />
    </Route>
  );
}

export default GameRoute;