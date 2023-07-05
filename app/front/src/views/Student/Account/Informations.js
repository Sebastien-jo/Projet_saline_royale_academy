import React from "react";
import MenuBar from "../../../components/navbar/MenuBar";
import Input from "../../../components/form/input";

const Informations = () => {
    return (
        <div className="main-container">
            <div className="main-content isMenu">
                <MenuBar items={[
                    {
                        name: "Mes informations",
                        link: "/account"
                    },
                    {
                        name: "Ma progression",
                        link: "/account/progression"
                    },
                    {
                        name: "Mentions légales",
                        link: "/account/mentions-legales"
                    }]}/>
                <div className={"container-padding"}>
                    <div className={"row-container"}>
                        <h2 className={"title"}>Mes informations personnelles</h2>
                        <div className={"column-container"}>
                            <img src={"https://picsum.photos/200/200"} className={"avatar"}/>
                        </div>
                        <div className={"column-container"}>
                            <form name={"form"}>
                                <div className={"row-container"}>
                                    <Input label={"Nom"} name={"name"} type={"text"} placeholder={"Nom"} value={"Doe"}/>
                                    <Input label={"Prénom"} name={"firstname"} type={"text"} placeholder={"Prénom"} value={"John"}/>
                                </div>
                                <div className={"row-container"}>
                                    <Input label={"Email"} name={"email"} type={"email"} placeholder={"Email"} value={"Email"}/>
                                </div>
                                <div className={"row-container"}>
                                    <Input label={"Mot de passe"} name={"password"} type={"password"} placeholder={"Mot de passe"} value={"Mot de passe"}/>
                                </div>
                                <input type={"submit"} value={"Modifier"} className={"button"}/>
                            </form>
                        </div>
                    </div>

                    <div className={"row-container"}>
                        <h2 className={"title"}>Mon abonnement</h2>

                    </div>

                </div>




            </div>
        </div>
    );
}

export default Informations;
