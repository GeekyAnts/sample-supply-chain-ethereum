import { NativeBaseProvider } from "native-base";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "./store";
import { Provider } from "react-redux";

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <NativeBaseProvider>
        <Router>
          <App />
        </Router>
      </NativeBaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
