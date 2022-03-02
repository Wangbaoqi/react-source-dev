import React from "react";
import ReactDOM from "react-dom";
// import App from "./react_api/component";

import App from './demo_lazy'

const rootEl = document.getElementById("root");

// ReactDOM.render(<App />, rootEl);
ReactDOM.unstable_createRoot(rootEl).render(<App />);
