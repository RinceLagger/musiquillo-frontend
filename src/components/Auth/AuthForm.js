import React from "react";

const initialState = {
  username: "",
  email: "",
  password: "",
}

function AuthForm({ btnText, onSubmit, signUp }) {
  const [state, setState] = React.useState(initialState);

  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(state);
    setState(initialState)
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        username
        <input
          type="text"
          name="username"
          value={state.username}
          onChange={handleChange}
        />
      </label>
      {signUp && (
        <label>
          email
          <input
            type="email"
            name="email"
            value={state.email}
            onChange={handleChange}
          />
        </label>
      )}

      <label>
        password
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
        />
      </label>
      <button>{btnText}</button>
    </form>
  );
}

export default AuthForm;
