import "./App.css";
import {  Switch, Route } from "react-router-dom";
import Home from "./views/Home/Home";
import Login from "./views/Auth/Login";
import Signup from "./views/Auth/Signup";
import PrivateRoute from "./Routes/PrivateRoute";
import RoomMenu from "./views/RoomMenu/RoomMenu";
import AnonRoute from "./Routes/AnonRoute";
import GameRoute from "./Routes/GameRoute";
import NewRoom from "./views/NewRoom/NewRoom";
import JoinRoom from "./views/JoinRoom/JoinRoom";
import WaitingRoom from "./views/WaitingRoom/WaitingRoom";
import GameRoom from "./views/GameRoom/GameRoom";
import ResultsRoom from "./views/ResultsRoom/ResultsRoom";
import WinnerRoom from "./views/WinnerRoom/WinnerRoom";
import PageNotFound from "./views/PageNotFound/PageNotFound";
import Disconnection from "./views/Disconnection/Disconnection";

function App() {
  return (
    <div className="App container-home">
      <Switch>
        <AnonRoute exact path="/login" component ={Login}  />
        <AnonRoute exact path="/signup" component ={Signup}  />
        <PrivateRoute exact path="/room-menu" component ={RoomMenu}  />
        <PrivateRoute exact path="/newRoom" component ={NewRoom}  />
        <PrivateRoute exact path="/joinRoom" component ={JoinRoom}  />
        <GameRoute exact path="/waiting-room" component ={WaitingRoom}  />
        <GameRoute exact path="/game-room" component ={GameRoom}  />
        <GameRoute exact path="/results-room" component ={ResultsRoom}  />
        <GameRoute exact path="/winner-room" component ={WinnerRoom}  />
        <GameRoute exact path="/disconnect" component ={Disconnection}  />
        <Route exact path="/">
          <Home />
        </Route>
        <Route >
          <PageNotFound/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
