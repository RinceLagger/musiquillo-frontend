import React from "react";
import { login, logout, signup } from "../service/auth.service";

import {
  getLocalUser,
  saveUser,
  removeUser,
  defaultUser,
} from "./AuthContext.utils";

export const AuthContext = React.createContext({});

const initialState = {
  user: getLocalUser(),
};

function AuthProvider({ children }) {
  const [state, setState] = React.useState(initialState);

  const [error, setError] = React.useState(false);

  const showError = () =>{
    setError(true);
    setTimeout(()=>setError(false), 2000);
  }
  

  const handleLogin = React.useCallback(async (user) => {
    try {
      const { data: loggedUser } = await login(user);
      
      saveUser(loggedUser);
      setState({ user: { ...loggedUser, isLogged: true } });
    } catch (e) {
      console.log(showError)
      showError();
      console.error(e);
    }
  }, []);

  const handleSignup = React.useCallback(async (user) => {
    try {
      const { data: loggedUser } = await signup(user);
      saveUser(loggedUser);
      setState({ user: { ...loggedUser, isLogged: true } });
    } catch (e) {
      showError();
      console.error(e);
    }
  }, []);

  const handleLogout = React.useCallback(async () => {
    try {
      await logout();
      removeUser();
      setState({ user: defaultUser() });
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: state.user, handleLogin, handleLogout, handleSignup, error }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
