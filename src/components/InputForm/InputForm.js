import React from "react";

const initialState = {
  roomId: "",
};

function InputForm({ submitAction }) {
  const [formState, setFormState] = React.useState(initialState);

  const handleChange = ({ target }) => {
    setFormState({
      ...formState,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitAction(formState.roomId);
  };

  return (
    <div className="container">
      <h1>Create new Room</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="roomId">Create Room</label>
        <input
          type="text"
          name="roomId"
          id="roomId"
          required
          value={formState.roomId}
          onChange={handleChange}
        />

        <button type="submit">Send Room ID</button>
      </form>
    </div>
  );
}

export default InputForm;
