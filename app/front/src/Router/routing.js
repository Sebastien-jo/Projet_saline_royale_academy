import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route, Router, useNavigate, HashRouter} from "react-router-dom";
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

import Forum from "../views/Student/Forum";

import Courses from "../views/Teacher/Courses";
import Notations from "../views/Teacher/Notations";
import Gestion from "../views/Teacher/Gestion";
import AddCourses from "../views/Teacher/AddCourses";

import MasterclassAdmin from "../views/Admin/Masterclass";
import OeuvresAdmin from "../views/Admin/Oeuvres";
import UserAdmin from "../views/Admin/users/Users";
import CompositorAdmin from "../views/Admin/Compositor/Compositors";
import BadgesAdmin from "../views/Admin/badges/Badges";
import FormCompositor from "../views/Admin/Compositor/FormCompositor";
import FormBadges from "../views/Admin/badges/FormBadges";
import FormUser from "../views/Admin/users/FormUser";


const Routing = () => {
    const { isAuthenticated, user } = useAuth();

    return (
        <HashRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signin" element={<SignIn />} />
                {isAuthenticated ? (
                    <>
                        {user.roles[0] == "USER" ? (
                            <Route path="/" element={<GlobalLayout />}>
                                <Route path="/" exact element={<Home />} title="Home" />
                                <Route path="/mystudy" element={<MyStudy />} title="MyStudy" />
                                <Route path="/forum" element={<Forum />} title={"Forum"} />
                                <Route path="/signets/*">
                                    <Route index element={<Signets />} title="Signets" />
                                    <Route path="masterclass" element={<MasterclassSignets />} />
                                    <Route path="oeuvres" element={<OeuvresSignets />} />
                                    <Route path="compositeur" element={<CompositeurSignets />} />
                                </Route>
                                <Route path="/library/*">
                                    <Route index element={<Library />} title="Library" />
                                    <Route path="masterclass" element={<MasterclassLibrary />} />
                                    <Route path="oeuvres" element={<OeuvresLibrary />} />
                                    <Route path="compositeur" element={<CompositeurLibrary />} />
                                </Route>
                                <Route path="masterclass/:id" element={<SingleMasterclass />} />
                                <Route path="oeuvre/:id" element={<SingleOeuvre />} />
                                <Route path="compositeur/:id" element={<SingleCompositeur />} />
                                <Route path="/account/*">
                                    <Route index element={<Informations />} title="Informations" />
                                    <Route path={"progression"} element={<Progress />} title="Progression" />
                                    <Route path={"mentions-legales"} element={<MentionsLegales />} title="Mentions légales" />
                                </Route>
                            </Route>
                        ) : user.roles[0] === "TEACHER" ? (
                            <Route path="/" element={<GlobalLayout />}>
                                <Route path="/" exact element={<Courses />} title="MyCourses" />
                                <Route path="/notations" element={<Notations />} title="Notations" />
                                <Route path={"/gestion"} element={<Gestion />} title="Gestion" />
                                <Route path={"/gestion/ajout"} element={<AddCourses />} title="Gestion" />
                                <Route path="/account">
                                    <Route index element={<Informations />} title="Informations" />
                                    <Route path={"mentions-legales"} element={<MentionsLegales />} title="Mentions légales" />
                                </Route>
                            </Route>
                        ) : user.roles[0] === "ADMIN" ? (
                            <Route path="/" element={<GlobalLayout />}>
                                <Route path="/masterclass" element={<MasterclassAdmin />} title="Masterclass" />
                                <Route path="/oeuvres" element={<OeuvresAdmin />} title="Oeuvres" />
                                <Route path="/compositeurs">
                                    <Route index element={<CompositorAdmin />} title="Compositeurs" />
                                    <Route path="add" element={<FormCompositor title={"Ajouter un compositeur"}/>} />
                                    <Route path="edit/:id" element={<FormCompositor title={"Mettre à jour ce compositeur"}/>} />
                                </Route>
                                <Route path="/badges/*">
                                    <Route index element={<BadgesAdmin />} title="Badges" />
                                    <Route path="add" element={<FormBadges title={"Ajouter un badge"}/>} />
                                    <Route path="edit/:id" element={<FormBadges title={"Mettre à jour ce badge"}/>} />
                                </Route>
                                <Route path="/users/*">
                                    <Route index element={<UserAdmin />} title="User" />
                                    <Route path="add" element={<FormUser title={"Ajouter un utilisateur"}/>} />
                                    <Route path="edit/:id" element={<FormUser title={"Mettre à jour cet utilisateur"}/>} />
                                </Route>
                            </Route>
                        ) : (
                            <Route path="*" element={<Login />} />
                        )}
                    </>
                ) : (
                    <Route path="*" element={<Login />} />
                )}
            </Routes>
        </HashRouter>
    );

}

export default Routing;



