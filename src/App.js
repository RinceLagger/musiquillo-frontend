import './App.css';
import { Link, Redirect, Switch, Route } from "react-router-dom";

import SendAudio from './components/views/SendAudio';

function App() {
  return (
    <div className="App">


      <Switch>
      <Route exact path="/">
        <SendAudio/>

      </Route>


      </Switch>
     
    </div>
  );
}

export default App;
