import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store";
import { Provider } from "react-redux";
import App from "./pages/Todo/App";
import createTheme from "@mui/material/styles/createTheme";
import { blue, grey, purple } from "@mui/material/colors";
import { ThemeProvider } from "@emotion/react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const theme = createTheme({
  palette: {
    primary: {
      main: "#0ab0e8",
    },
    secondary: {
      main: "#a0d4a3",
    },
    background: {
      default: "#565454",
      paper: "#4e4c4c",
    },
    text: {
      primary: "rgba(255,255,255,0.7)",
    },
  },
});

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
