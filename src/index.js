import * as process from 'process';
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { SessionProvider } from "./context/session/session.context";
import { UserProvider } from "./context/user/user.context";
import { BrowserRouter } from "react-router-dom";
import { ChatProvider } from "./context/chat/chat.context";
import WhiteboardContextWrapper from "./context/whiteboard/whiteboard-context-wrapper.context";
import {CallProvider} from "./context/call/call.context";
import {PrivateCallProvider} from "./context/private-call/private-call.context";
window.global = window;
window.process = process;
window.Buffer = [];
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <UserProvider>
      <SessionProvider>
          <PrivateCallProvider>
            <ChatProvider>
                <WhiteboardContextWrapper>
                    <CallProvider>
                      <BrowserRouter>
                          <App />
                      </BrowserRouter>
                    </CallProvider>
                </WhiteboardContextWrapper>
            </ChatProvider>
          </PrivateCallProvider>
      </SessionProvider>
    </UserProvider>
);
