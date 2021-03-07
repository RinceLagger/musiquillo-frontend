import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/AuthContext.utils";

function PrivateRoute({ component: Component, exact, path, ...props }) {
  const { user } = useAuth();
  //console.log("en private:",user);
  if (!user.isLogged) {
    return <Redirect to="/login" />;
  }

  return (
    <Route exact path={path}>
      <Component {...props} />
    </Route>
  );
}

export default PrivateRoute;