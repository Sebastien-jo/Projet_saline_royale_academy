import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import {store, persistor} from "./store/store";

import "./styles/root.css";
import Routing from "./Router/routing";

import './i18n';


ReactDOM.createRoot(document.getElementById("root")).render(

    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Routing />
            </PersistGate>
        </Provider>
    </React.StrictMode>

);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
