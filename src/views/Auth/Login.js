import React from "react";
import AuthForm from "../../components/Auth/AuthForm";
import { login } from "../../service/auth.service";
import { useAuth } from "../../context/AuthContext";
import { Redirect } from "react-router-dom";

function Login() {
  
  const { user, setUser } = useAuth();

  const handleLogin = async (user) => {
    try {
      const { data } = await login(user);
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

  if (user) {
    return <Redirect to="/room-menu" />;
  }

  return <AuthForm btnText="login" onSubmit={handleLogin} />;
}

export default Login;
