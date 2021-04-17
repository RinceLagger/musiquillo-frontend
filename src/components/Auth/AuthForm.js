import React from "react";

import "./AuthForm.css";
import { useAuth } from "../../context/AuthContext.utils";

const UPDATE_NAME = "UPDATE_NAME";
const UPDATE_EMAIL = "UPDATE_EMAIL";
const UPDATE_PASSWORD = "UPDATE_PASSWORD";

const nameAction = (payload) => ({ type: UPDATE_NAME, payload });
const emailAction = (payload) => ({ type: UPDATE_EMAIL, payload });
const passwordAction = (payload) => ({ type: UPDATE_PASSWORD, payload });

function authReducer(state, action) {
  switch (action.type) {
    case UPDATE_NAME:
      return {
        ...state,
        username: action.payload,
      };
    case UPDATE_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case UPDATE_PASSWORD:
      return {
        ...state,
        password: action.payload,
      };
    default:
      throw new Error("action type not supported");
  }
}

const initialState = {
  username: "",
  email: "",
  password: "",
};

function AuthForm({ btnText, onSubmit, signUp }) {
  //const [state, setState] = React.useState(initialState);
  const [state, dispatch] = React.useReducer(authReducer, initialState);
  const { error, errorText } = useAuth();

  // const handleChange = ({ target }) => {
  //   setState({ ...state, [target.name]: target.value });

  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(state);
    //setState(initialState);
    dispatch(nameAction(""));
    dispatch(emailAction(""));
    dispatch(passwordAction(""));
  };

  return (
    <>
      <form className="container-form" onSubmit={handleSubmit}>
        <label htmlFor="username">username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={state.username}
          onChange={({ target }) => dispatch(nameAction(target.value))}
        />

        {signUp && (
          <>
            <label htmlFor="email">email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={state.email}
              onChange={({ target }) => dispatch(emailAction(target.value))}
            />
          </>
        )}

        <label htmlFor="password">password</label>

        <input
          type="password"
          name="password"
          id="password"
          value={state.password}
          onChange={({ target }) => dispatch(passwordAction(target.value))}
        />

        <button className="primary">{btnText}</button>
        {error && <p id="wrong-data">{errorText}</p>}
      </form>
    </>
  );
}

export default AuthForm;
