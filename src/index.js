import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {SessionProvider} from "./context/session/session.context";
import {UserProvider} from "./context/user/user.context"
import {BrowserRouter} from "react-router-dom";
import {ChatProvider} from "./context/chat/chat.context";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <UserProvider>
            <SessionProvider>
                <ChatProvider>
                    <BrowserRouter>
                        <DevSupport ComponentPreviews={ComponentPreviews}
                                    useInitialHook={useInitial}
                        >
                            <App/>
                        </DevSupport>
                    </BrowserRouter>
                </ChatProvider>
            </SessionProvider>
        </UserProvider>
    </React.StrictMode>
);
reportWebVitals();
