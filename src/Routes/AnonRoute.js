import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AnonRoute({ component: Component, exact, path, ...props }) {
  const { user } = useAuth();
  
  if (user) {
    console.log("ya logueado")
    return <Redirect to="/room-menu" />;
  }

  return (
    <Route exact path={path}>
      <Component {...props} />
    </Route>
  );
}

export default AnonRoute;
