import React from "react";

import "./AuthForm.css";
import { useAuth } from "../../context/AuthContext.utils";

const initialState = {
  username: "",
  email: "",
  password: "",
};

function AuthForm({ btnText, onSubmit, signUp }) {
  const [state, setState] = React.useState(initialState);
  const { error, errorText } = useAuth();

  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(state);
    setState(initialState);
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
          onChange={handleChange}
        />

        {signUp && (
          <>
            <label htmlFor="email">email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={state.email}
              onChange={handleChange}
            />
          </>
        )}

        <label htmlFor="password">password</label>

        <input
          type="password"
          name="password"
          id="password"
          value={state.password}
          onChange={handleChange}
        />

        <button className="primary">{btnText}</button>
        {error && (
          <p id="wrong-data">
            {errorText}
          </p>
        )}
      </form>
    </>
  );
}

export default AuthForm;
