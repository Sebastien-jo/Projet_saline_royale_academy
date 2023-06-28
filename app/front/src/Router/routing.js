import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Router, useNavigate } from "react-router-dom";
import "../index.css";
import { useAuth } from "../hooks/useAuth";

import "../styles/root.css";
import GlobalLayout from "../GlobalLayout";

import Login from "../views/Authentification/Login";
import SignIn from "../views/Authentification/SignIn";

import Account from "../views/Student/Account/Account";
import Informations from "../views/Student/Account/Informations";
import Progress from "../views/Student/Account/Progress";
import MentionsLegales from "../views/Student/Account/MentionsLegales";

import Home from "../views/Student/Home";
import Masterclass from "../views/Student/Masterclass";
import MyStudy from "../views/Student/MyStudy";

import Library from "../views/Student/Library/Library";
import MasterclassLibrary from "../views/Student/Library/Masterclass";
import OeuvresLibrary from "../views/Student/Library/Oeuvres";
import CompositeurLibrary from "../views/Student/Library/Compositeur";

import Signets from "../views/Student/Signets/Signets";
import OeuvresSignets from "../views/Student/Signets/Oeuvres";
import CompositeurSignets from "../views/Student/Signets/Compositeurs";
import MasterclassSignets from "../views/Student/Signets/Masterclass";

import SingleMasterclass from "../views/Student/SingleViews/singleMasterclass";
import SingleOeuvre from "../views/Student/SingleViews/singleOeuvre";
import SingleCompositeur from "../views/Student/SingleViews/singleCompositeur";

import Courses from "../views/Teacher/Courses";
import Notations from "../views/Teacher/Notations";
import Gestion from "../views/Teacher/Gestion";


const Routing = () => {
    const { isAuthenticated, user } = useAuth();


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signin" element={<SignIn />}/>
                {
                    isAuthenticated ? (
                        <>
                            {
                                user.roles[0] !== "TEACHER" ?
                                    <Route path="/" element={<GlobalLayout />}>
                                        <Route path="/" exact element={<Home />} title="Home" />
                                        <Route path="/masterclass" element={<Masterclass />} title="Masterclass" />
                                        <Route path="/mystudy" element={<MyStudy />} title="MyStudy"  />
                                        <Route path="/signets">
                                            <Route index element={<Signets />} title="Signets" />
                                            <Route path="masterclass" element={<MasterclassSignets/>}/>
                                            <Route path="oeuvres" element={<OeuvresSignets/>}/>
                                            <Route path="compositeur" element={<CompositeurSignets/>}/>
                                        </Route>
                                        <Route path="/library">
                                            <Route index element={<Library />} title="Library" />
                                            <Route path="masterclass" element={<MasterclassLibrary/>} />
                                            <Route path="masterclass/:id" element={<SingleMasterclass/>}/>
                                            <Route path="oeuvres" element={<OeuvresLibrary />}/>
                                            <Route path="oeuvre/:id" element={<SingleOeuvre />}/>
                                            <Route path="compositeur" element={<CompositeurLibrary />}/>
                                            <Route path={"compositeur/:id"} element={<SingleCompositeur />}/>
                                        </Route>
                                        <Route path="/account">
                                            <Route index element={<Informations />} title="Informations" />
                                            <Route path={"progression"} element={<Progress />} title="Progression" />
                                            <Route path={"mentions-legales"} element={<MentionsLegales />} title="Mentions légales" />
                                        </Route>
                                    </Route>
                                    :
                                    <Route path="/" element={<GlobalLayout />}>
                                        <Route path="/" exact element={<Courses />} title="MyCourses" />
                                        <Route path="/notations" element={<Notations />} title="Notations" />
                                        <Route path={"/gestion"} element={<Gestion />} title="Gestion" />
                                        <Route path="/account">
                                            <Route index element={<Informations />} title="Informations" />
                                            <Route path={"mentions-legales"} element={<MentionsLegales />} title="Mentions légales" />
                                        </Route>
                                    </Route>

                            }
                        </>
                    ) : (
                        <Route path="*" element={<Login />} />
                    )
                }
            </Routes>
        </BrowserRouter>
    );
}

export default Routing;



