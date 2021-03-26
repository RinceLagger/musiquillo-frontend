import React from "react";
import AuthForm from "../../components/Auth/AuthForm";

import { useAuth } from "../../context/AuthContext.utils";
import { Redirect } from "react-router-dom";

function Signup() {
  const { user, handleSignup } = useAuth();

  if (user.isLogged) {
    console.log("redirect");
    return <Redirect to="/room-menu" />;
  }

  return <AuthForm btnText="signup" onSubmit={handleSignup} signUp={true} />;
}

export default Signup;
