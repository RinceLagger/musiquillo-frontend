import "./App.css";
import { Link, Redirect, Switch, Route } from "react-router-dom";
import Home from "./views/Home/Home";
import Login from "./views/Auth/Login";
import Signup from "./views/Auth/Signup";

//import SendAudio from './components/views/SendAudio';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
