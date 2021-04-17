import { createStore, compose } from "redux";

import { rootReducer } from "./reducers";

const reduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

export const store = createStore(rootReducer, compose(reduxDevTools));
