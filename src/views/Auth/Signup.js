import React from "react";
import AuthForm from "../../components/Auth/AuthForm";
import { signup } from "../../service/auth.service";

function Signup() {
  const handleSignup = async (user) => {
    try {
      const usuario = await signup(user);
      console.log(usuario);
    } catch (e) {
      console.error(e);
    }
  };

  return <AuthForm btnText="signup" onSubmit={handleSignup} signUp = {true}/>;
}

export default Signup;
