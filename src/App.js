import "./App.css";
import { Link, Redirect, Switch, Route } from "react-router-dom";
import Home from "./views/Home/Home";
import Login from "./views/Auth/Login";
import Signup from "./views/Auth/Signup";
import PrivateRoute from "./Routes/PrivateRoute";
import RoomMenu from "./views/RoomMenu/RoomMenu";
import AnonRoute from "./Routes/AnonRoute";
import NewRoom from "./views/NewRoom/NewRoom";

//import SendAudio from './components/views/SendAudio';

function App() {
  return (
    <div className="App">
      <Switch>
        <AnonRoute exact path="/login" component ={Login}  />
        <AnonRoute exact path="/signup" component ={Signup}  />
        <PrivateRoute exact path="/room-menu" component ={RoomMenu}  />
        <PrivateRoute exact path="/newRoom" component ={NewRoom}  />
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
