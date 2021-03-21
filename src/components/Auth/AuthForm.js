import React from "react";

import "./AuthForm.css";

const initialState = {
  username: "",
  email: "",
  password: "",
};

function AuthForm({ btnText, onSubmit, signUp }) {
  const [state, setState] = React.useState(initialState);

  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(state);
    setState(initialState);
  };

  return (
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
    </form>
  );
}

export default AuthForm;
