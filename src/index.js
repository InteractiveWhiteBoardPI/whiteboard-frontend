import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { SessionProvider } from "./context/session/session.context";
import { UserProvider } from "./context/user/user.context";
import { BrowserRouter } from "react-router-dom";
import { ChatProvider } from "./context/chat/chat.context";
import WhiteboardContextWrapper from "./context/whiteboard/whiteboard-context-wrapper.context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <SessionProvider>
        <ChatProvider>
          <BrowserRouter>
            <WhiteboardContextWrapper>
              <App />
            </WhiteboardContextWrapper>
          </BrowserRouter>
        </ChatProvider>
      </SessionProvider>
    </UserProvider>
  </React.StrictMode>
);
reportWebVitals();
