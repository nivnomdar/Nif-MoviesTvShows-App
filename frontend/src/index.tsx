import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Router } from "react-router-dom";
import MainRoute from "./components/Routing/MainRoute";
import App from "./App";
import { Provider } from "react-redux";
import { WatchWeb } from "./components/Redux/Store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={WatchWeb}>
    <BrowserRouter>
      <React.StrictMode>
        <MainRoute />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
