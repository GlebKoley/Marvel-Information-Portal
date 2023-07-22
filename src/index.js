import "./css/main.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/App/App";
import { Test } from "./components/App/Test.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
// root.render(<Test />);
