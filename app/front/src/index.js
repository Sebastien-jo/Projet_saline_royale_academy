import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

import "./styles/root.css";
import GlobalLayout from "./GlobalLayout";

import Login from "./views/Authentification/Login";
import SignIn from "./views/Authentification/SignIn";

import Account from "./views/Account/Account";
import Informations from "./views/Account/Informations";
import Progress from "./views/Account/Progress";
import MentionsLegales from "./views/Account/MentionsLegales";

import Home from "./views/Home";
import Masterclass from "./views/Masterclass";
import MyStudy from "./views/MyStudy";

import Library from "./views/Library/Library";
import MasterclassLibrary from "./views/Library/Masterclass";
import OeuvresLibrary from "./views/Library/Oeuvres";
import CompositeurLibrary from "./views/Library/Compositeur";

import Signets from "./views/Signets/Signets";
import OeuvresSignets from "./views/Signets/Oeuvres";
import CompositeurSignets from "./views/Signets/Compositeurs";
import MasterclassSignets from "./views/Signets/Masterclass";

import SingleMasterclass from "./views/SingleViews/singleMasterclass";
import SingleOeuvre from "./views/SingleViews/singleOeuvre";

const isLoginPage = window.location.pathname === "/login" || window.location.pathname === "/signin";


ReactDOM.createRoot(document.getElementById("root")).render(

    <React.StrictMode>
            <BrowserRouter>
                {isLoginPage ? (
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signin" element={<SignIn />} />
                    </Routes>
                ) : (
                    <GlobalLayout>
                        <Routes>
                            <Route index element={<Home />} title="Home"/>
                            <Route path="/" element={<Home />} title="Home" />
                            <Route path="/masterclass" element={<Masterclass />} title="Masterclass" />
                            <Route path="/mystudy" element={<MyStudy />} title="MyStudy"  />
                            <Route path="/signets/*" element={<Signets />} title="Signets">
                                <Route path="masterclass" element={<MasterclassSignets/>}/>
                                <Route path="oeuvres" element={<OeuvresSignets/>}/>
                                <Route path="compositeur" element={<CompositeurSignets/>}/>
                            </Route>
                            <Route path="/library/*" element={<Library />} title="Library">
                                <Route path="masterclass" element={<SingleOeuvre/>} />
                                <Route path="masterclass/:id" element={<SingleOeuvre/>}/>
                                <Route path="oeuvres" element={<OeuvresLibrary />}/>
                                <Route path="compositeur" element={<CompositeurLibrary />}/>
                            </Route>
                            <Route path="/account/*" element={<Progress />} title="Account">
                                <Route path={"informations"} element={<Informations />} title="Informations" />
                                <Route path={"progression"} element={<Progress />} title="Progression" />
                                <Route path={"mentions-legales"} element={<MentionsLegales />} title="Mentions légales" />
                            </Route>
                        </Routes>
                    </GlobalLayout>
                )}
            </BrowserRouter>
    </React.StrictMode>

);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
