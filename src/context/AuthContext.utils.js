import React from "react";
import { AuthContext } from "./AuthContext";


export function useAuth() {
  return React.useContext(AuthContext);
}

export function withAuth(Component) {
  return function Wrapper(props) {
    const state = useAuth();
    return <Component {...props} {...state} />;
  };
}

export function defaultUser() {
  return {
    id: null,
    email: "",
    isLogged: false,
  };
}

export function getLocalUser() {
  const user = sessionStorage.getItem("user");
  return user ? JSON.parse(user) : defaultUser();
}

export function saveUser(user) {
  const strgyfiedUser = JSON.stringify({ ...user, isLogged: true });
  sessionStorage.setItem("user", strgyfiedUser);
}

export function removeUser() {
  sessionStorage.removeItem("user");
}


