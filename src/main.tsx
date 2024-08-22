import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import WebApp from "@twa-dev/sdk";
WebApp.ready();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);
