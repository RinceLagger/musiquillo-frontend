import React from "react";
import AuthForm from "../../components/Auth/AuthForm";

import { useAuth } from "../../context/AuthContext.utils";
import { Redirect } from "react-router-dom";

function Login() {
  const { user, handleLogin } = useAuth();

  if (user.isLogged) {
    return <Redirect to="/room-menu" />;
  }

  return <AuthForm btnText="login" onSubmit={handleLogin} />;
}

export default Login;
