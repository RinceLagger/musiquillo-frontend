import React from "react";
import AuthForm from "../../components/Auth/AuthForm";
//import { signup } from "../../service/auth.service";
import { useAuth } from "../../context/AuthContext.utils";
import { Redirect } from "react-router-dom";

function Signup() {

  const { user, handleSignup } = useAuth();


  //console.log("en login",user);
  if (user.isLogged) {
    console.log("redirect")
    return <Redirect to="/room-menu" />;
  }

  return <AuthForm btnText="signup" onSubmit={handleSignup} signUp = {true}/>;
}

export default Signup;
