import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/AuthContext.utils";

function AnonRoute({ component: Component, exact, path, ...props }) {
  const { user } = useAuth();

  if (user.isLogged) {
    return <Redirect to="/room-menu" />;
  }

  return (
    <Route exact path={path}>
      <Component {...props} />
    </Route>
  );
}

export default AnonRoute;
