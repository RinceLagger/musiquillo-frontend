import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import PlayersProvider from "./context/PlayersContext";
import SocketProvider from "./context/SocketContext";
import TurnProvider from "./context/TurnContext";
import CodeProvider from "./context/CodeContext";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <SocketProvider>
          <PlayersProvider>
            <CodeProvider>
              <TurnProvider>
                <App />
              </TurnProvider>
            </CodeProvider>
          </PlayersProvider>
        </SocketProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
