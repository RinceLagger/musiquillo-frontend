import "./App.css";
import { Link, Redirect, Switch, Route } from "react-router-dom";
import Home from "./views/Home/Home";
import Login from "./views/Auth/Login";
import Signup from "./views/Auth/Signup";
import PrivateRoute from "./Routes/PrivateRoute";
import RoomMenu from "./views/RoomMenu/RoomMenu";

//import SendAudio from './components/views/SendAudio';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <PrivateRoute exact path="/room-menu" component ={RoomMenu}  />
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
