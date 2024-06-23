import { App } from "./App";
import ReactDom from "react-dom/client";
import React from "react";
import '../src/style.css'

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(<App/>)