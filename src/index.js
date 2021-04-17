import React from "react";
import ReactDOM from "react-dom";
import "./reset.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import PlayersProvider from "./context/PlayersContext";
import SocketProvider from "./context/SocketContext";
import TurnProvider from "./context/TurnContext";
import CodeProvider from "./context/CodeContext";
import SongProvider from "./context/SongContext";
import ErrorBoundery from "./components/ErrorBoundery/ErrorBoundery";
import { Provider } from "react-redux";
import { store } from "./store/store";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <AuthProvider>
          <SocketProvider>
            <PlayersProvider>
              <CodeProvider>
                <TurnProvider>
                  <SongProvider>
                    <ErrorBoundery>
                      <App />
                    </ErrorBoundery>
                  </SongProvider>
                </TurnProvider>
              </CodeProvider>
            </PlayersProvider>
          </SocketProvider>
        </AuthProvider>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
