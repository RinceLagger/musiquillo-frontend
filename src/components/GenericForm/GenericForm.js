import React from "react";

const initialState = {
  input: "",
};

function GenericForm({ text, btnTxt, buttonEnable, submitAction }) {
  const [formState, setFormState] = React.useState(initialState);

  const handleChange = ({ target }) => {
    setFormState({
      ...formState,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitAction(formState.input);
    setFormState(initialState);
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="input"
          id="input"
          placeholder={text}
          required
          value={formState.input}
          onChange={handleChange}
        />

        <button className="primary" type="submit" disabled={buttonEnable}>
          {btnTxt}
        </button>
      </form>
    </div>
  );
}

export default GenericForm;
