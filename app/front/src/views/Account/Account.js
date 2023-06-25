import React from "react";
import MenuBar from "../../components/navbar/MenuBar";

const Account = () => {
    return (
        <div className="main-container">
            <MenuBar items={[
                {
                    name: "Mes informations",
                    link: "informations"
                },
                {
                    name: "Ma progression",
                    link: "progression"
                },
                {
                    name: "Mentions légales",
                    link: "mentions-legales"
                }]}/>
            <div className="main-content">


            </div>
        </div>

    );
}

export default Account;