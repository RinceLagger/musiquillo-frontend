import React from "react";
import AuthForm from "../../components/Auth/AuthForm";
import { login } from "../../service/auth.service";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const { setUser } = useAuth();
  const handleLogin = async (user) => {
    try {
      const { data } = await login(user);
      console.log(data)
      localStorage.setItem("user", JSON.stringify(data));
      setUser({ user: data.usuario });
      
    } catch (e) {
      console.error(e);
    }
  };

  return <AuthForm btnText="login" onSubmit={handleLogin} />;
}

export default Login;
