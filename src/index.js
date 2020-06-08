import React from "react";
import ReactDOM from "react-dom";
import { createHistory, LocationProvider } from "@reach/router";
import { ThemeProvider } from "styled-components";
import { ContextProvider } from "./state";
import App from "./App";
import { theme } from "./theme";

let history = createHistory(window);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <LocationProvider history={history}>
      <ContextProvider>
        <App />
      </ContextProvider>
    </LocationProvider>
  </ThemeProvider>,
  document.getElementById("root")
);
