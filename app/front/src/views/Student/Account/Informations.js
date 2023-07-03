import React from "react";
import MenuBar from "../../../components/navbar/MenuBar";

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
                    <h1>Mes informations</h1>
                </div>
            </div>
        </div>
    );
}

export default Informations;
