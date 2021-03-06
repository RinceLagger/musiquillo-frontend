import React from "react";
import AuthForm from "../../components/Auth/AuthForm";
import { signup } from "../../service/auth.service";
import { useAuth } from "../../context/AuthContext";
import { Redirect } from "react-router-dom";

function Signup() {

  const { user, setUser } = useAuth();
  
  const handleSignup = async (user) => {
    try {
      const {data} = await signup(user);
      console.log(data);
      sessionStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      
    } catch (e) {
      console.log(e);
      if (e.response) {
        console.error(e.response.data.message);
      }
    }
  };

  if (user.username) {
    return <Redirect to="/room-menu" />;
  }

  return <AuthForm btnText="signup" onSubmit={handleSignup} signUp = {true}/>;
}

export default Signup;
