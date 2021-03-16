import React from "react";
import AuthForm from "../../components/Auth/AuthForm";
//import { login } from "../../service/auth.service";
import { useAuth } from "../../context/AuthContext.utils";
import { Redirect } from "react-router-dom";

function Login() {
  
  const { user, handleLogin } = useAuth();


  //console.log("en login",user);
  if (user.isLogged) {
    console.log("redirect")
    return <Redirect to="/room-menu" />;
  }

  return <AuthForm btnText="login" onSubmit={handleLogin} />;
}

export default Login;
