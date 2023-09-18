import React, {useEffect} from "react";
import {BrowserRouter, Routes, Route, Router, HashRouter, Redirect} from "react-router-dom";

import { useNavigate } from "react-router-dom";

import "../index.css";
import { useAuth } from "../hooks/api/useAuth";

import "../styles/root.css";
import GlobalLayout from "../GlobalLayout";

import Login from "../views/Authentification/Login";
import SignIn from "../views/Authentification/SignIn";

import Informations from "../views/Student/Account/Informations";
import Progress from "../views/Student/Account/Progress";
import MentionsLegales from "../views/Student/Account/MentionsLegales";

import Home from "../views/Student/Home";
import MyStudy from "../views/Student/MyStudy";

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

import Forum from "../views/Student/Forum/Forum";

import Courses from "../views/Teacher/Courses";
import Notations from "../views/Teacher/Notations";

import MasterclassAdmin from "../views/Admin/Masterclass/Masterclass";
import OeuvresAdmin from "../views/Admin/Oeuvres/Oeuvres";
import UserAdmin from "../views/Admin/Users/Users";
import CompositorAdmin from "../views/Admin/Compositor/Compositors";
import BadgesAdmin from "../views/Admin/Badges/Badges";
import FormCompositor from "../views/Admin/Compositor/FormCompositor";
import FormBadge from "../views/Admin/Badges/FormBadge";
import FormUser from "../views/Admin/Users/FormUser";
import FormMasterclass from "../views/Admin/Masterclass/FormMasterclass";
import FormOeuvre from "../views/Admin/Oeuvres/FormOeuvre";
import SingleCompositor from "../views/Admin/Compositor/SingleCompositor";
import MasterclassChapter from "../views/Student/SingleViews/Lessons/MasterclassChapter";
import MyForum from "../views/Student/Forum/MyForum";



const Routing = () => {
    const { isAuthenticated, user, isTokenExpired, handleLogout } = useAuth();

    const tokenExpired = isTokenExpired();
    

    return (
        <HashRouter>
            <Routes>
                { isAuthenticated ?
                    tokenExpired ? (
                        <Redirect to={"/login"} />
                    ) : (
                    <>
                        {user.roles[0] === "ROLE_STUDENT" ? (
                            <Route path="/" element={<GlobalLayout />}>
                                <Route path="/" exact element={<Home />}/>
                                <Route path="/mystudy" element={<MyStudy />}/>
                                <Route path="/forum">
                                    <Route index element={<Forum />} />
                                    <Route path="/forum/myforum" element={<MyForum />}/>
                                </Route>
                                <Route path="/signets/*">
                                    <Route index element={<Signets />}/>
                                    <Route path="masterclass" element={<MasterclassSignets />} />
                                    <Route path="oeuvres" element={<OeuvresSignets />} />
                                    <Route path="compositeur" element={<CompositeurSignets />} />
                                </Route>
                                <Route path="/library/*">
                                    <Route index element={<MasterclassLibrary />}/>
                                    <Route index path="masterclass" element={<MasterclassLibrary />} />
                                    <Route path="oeuvres" element={<OeuvresLibrary />} />
                                    <Route path="compositeur" element={<CompositeurLibrary />}/>
                                </Route>
                                <Route path="/masterclass/:id/*">
                                    <Route index element={<SingleMasterclass />} />
                                    <Route path="chapter" element={<MasterclassChapter />} />
                                </Route>
                                <Route path="/oeuvre/:id" element={<SingleOeuvre />} />
                                <Route path="/compositeur/:id" element={<SingleCompositeur />} />
                                <Route path="/account/*">
                                    <Route index element={<Informations />} title="Informations" />
                                    <Route path={"progression"} element={<Progress />} title="Progression" />
                                    <Route path={"mentions-legales"} element={<MentionsLegales />} title="Mentions légales" />
                                </Route>
                            </Route>
                        ) : user.roles[0] === "ROLE_TEACHER" ? (
                            <Route path="/" element={<GlobalLayout />}>
                                <Route path="/" title="MyCourses">
                                    <Route index element={<Courses />} title="MyCourses" />
                                    <Route path={"/masterclass/add"} element={<FormMasterclass />} />
                                </Route>
                                <Route path="/notations" element={<Notations />} title="Notations" />
                                <Route path="/account">
                                    <Route index element={<Informations />} title="Informations" />
                                    <Route path={"mentions-legales"} element={<MentionsLegales />} title="Mentions légales" />
                                </Route>
                            </Route>
                        ) : user.roles[0] === "ROLE_ADMIN" ? (
                            <Route path="/" element={<GlobalLayout />}>
                                <Route index exact element={<MasterclassAdmin />} title="Masterclass" />
                                <Route path="/masterclass/*">
                                    <Route index element={<MasterclassAdmin />} title="Masterclass" />
                                    <Route path=":id" element={<SingleMasterclass />} />
                                    <Route path=":id/chapter" element={<MasterclassChapter />} />
                                    <Route path="add" element={<FormMasterclass text={"Ajouter une masterclass"}/>} />
                                    <Route path="edit/:id" element={<FormMasterclass text={"Mettre à jour cette masterclass"}/>} />
                                </Route>
                                <Route path="/oeuvres/*">
                                    <Route index element={<OeuvresAdmin />} title="Oeuvres" />
                                    <Route path="add" element={<FormOeuvre title={"Ajouter une oeuvre"}/>} />
                                    <Route path="edit/:id" element={<FormOeuvre title={"Mettre à jour cette oeuvre"}/>} />

                                </Route>
                                <Route path="/compositeurs">
                                    <Route index element={<CompositorAdmin />} title="Compositeurs" />
                                    <Route path="add" element={<FormCompositor title={"Ajouter un compositeur"}/>} />
                                    <Route path="edit/:id" element={<FormCompositor title={"Mettre à jour ce compositeur"}/>} />
                                    <Route path=":id" element={<SingleCompositor title={"Compositeur"}/>} />
                                </Route>
                                <Route path="/badges/*">
                                    <Route index element={<BadgesAdmin />} title="Badges" />
                                    <Route path="add" element={<FormBadge title={"Ajouter un badge"}/>} />
                                    <Route path="edit/:id" element={<FormBadge title={"Mettre à jour ce badge"}/>} />
                                </Route>
                                <Route path="/users/*">
                                    <Route index element={<UserAdmin />} title="User" />
                                    <Route path="add" element={<FormUser title={"Ajouter un utilisateur"}/>} />
                                    <Route path="edit/:id" element={<FormUser title={"Mettre à jour cet utilisateur"}/>} />
                                </Route>
                            </Route>
                        ) : (
                            <Redirect to={"/login"} />
                        )}
                    </>
                ) : (
                    <>
                        <Route index path="/" element={<Login />} />
                        <Route index path="/login" element={<Login />} />
                        <Route path="/signin" element={<SignIn />} />
                    </>
                )}
            </Routes>
        </HashRouter>
    );

}

export default Routing;



