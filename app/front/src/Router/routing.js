import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Router, useNavigate } from "react-router-dom";
import "../index.css";

import "../styles/root.css";
import GlobalLayout from "../GlobalLayout";

import Login from "../views/Authentification/Login";
import SignIn from "../views/Authentification/SignIn";

import Account from "../views/Account/Account";
import Informations from "../views/Account/Informations";
import Progress from "../views/Account/Progress";
import MentionsLegales from "../views/Account/MentionsLegales";

import Home from "../views/Home";
import Masterclass from "../views/Masterclass";
import MyStudy from "../views/MyStudy";

import Library from "../views/Library/Library";
import MasterclassLibrary from "../views/Library/Masterclass";
import OeuvresLibrary from "../views/Library/Oeuvres";
import CompositeurLibrary from "../views/Library/Compositeur";

import Signets from "../views/Signets/Signets";
import OeuvresSignets from "../views/Signets/Oeuvres";
import CompositeurSignets from "../views/Signets/Compositeurs";
import MasterclassSignets from "../views/Signets/Masterclass";

import SingleMasterclass from "../views/SingleViews/singleMasterclass";
import SingleOeuvre from "../views/SingleViews/singleOeuvre";
import SingleCompositeur from "../views/SingleViews/singleCompositeur";

import { useAuth } from "../hooks/useAuth";


const Routing = () => {
    const { isAuthenticated } = useAuth();


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signin" element={<SignIn />} />
                {
                    isAuthenticated ? (
                        <Route path="/" element={<GlobalLayout />}>
                            <Route path="/" exact element={<Home />} title="Home" />
                            <Route path="/masterclass" element={<Masterclass />} title="Masterclass" />
                            <Route path="/mystudy" element={<MyStudy />} title="MyStudy"  />
                            <Route path="/signets/*" element={<Signets />} title="Signets">
                                <Route path="masterclass" element={<MasterclassSignets/>}/>
                                <Route path="oeuvres" element={<OeuvresSignets/>}/>
                                <Route path="compositeur" element={<CompositeurSignets/>}/>
                            </Route>
                            <Route path="/library/*" element={<Library />} title="Library">
                                <Route path="masterclass" element={<MasterclassLibrary/>} />
                                <Route path="masterclass/:id" element={<SingleMasterclass/>}/>
                                <Route path="oeuvres" element={<OeuvresLibrary />}/>
                                <Route path="oeuvre/:id" element={<SingleOeuvre />}/>
                                <Route path="compositeur" element={<CompositeurLibrary />}/>
                                <Route path={"compositeur/:id"} element={<SingleCompositeur />}/>
                            </Route>
                            <Route path="/account/*" element={<Progress />} title="Account">
                                <Route path={"informations"} element={<Informations />} title="Informations" />
                                <Route path={"progression"} element={<Progress />} title="Progression" />
                                <Route path={"mentions-legales"} element={<MentionsLegales />} title="Mentions légales" />
                            </Route>
                        </Route>
                    ) : (
                        <Route path="*" element={<Login />} />
                    )
                }
            </Routes>
        </BrowserRouter>
    );
}

export default Routing;



