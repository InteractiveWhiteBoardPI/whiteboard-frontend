import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { SessionProvider } from "./context/session/session.context";
import { UserProvider } from "./context/user/user.context"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <SessionProvider>
        <App />
      </SessionProvider>
    </UserProvider>
  </React.StrictMode>
);
reportWebVitals();
