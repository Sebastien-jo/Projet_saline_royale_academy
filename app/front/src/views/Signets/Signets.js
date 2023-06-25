import React from "react";
import SidebarLibrary from "../../components/sidebar/sidebarLibrary";
import Button from "../../components/button/button";
import "../../styles/signets.css";

const Signets = () => {
    return (
        <div className="main-container">
            <div className="main-content">
                <h2>Votre bibliothèque rien que pour vous</h2>
                <div className="signets-container">
                    <div className="signets-card">
                        <div className="signets-card-header">
                            <h1>Mes masterclass favoris</h1>
                            <span className="subtitle">Vous n'avez pas encore de masterclass favorites</span>
                        </div>
                        <Button className={"red-full"} text={"Voir tout"} isArrow={true} link={"/signets/masterclass"}/>
                    </div>

                    <div className="signets-card">
                        <div className="signets-card-header">
                            <h1>Mes oeuvres favoris</h1>
                            <span className="subtitle">Vous n'avez pas encore d'oeuvres favorites</span>
                        </div>
                        <Button className={"red-full"} text={"Voir tout"} isArrow={true} link={"/signets/oeuvres"}/>
                    </div>

                    <div className="signets-card">
                        <div className="signets-card-header">
                            <h1>Mes compositeurs favoris</h1>
                            <span className="subtitle">Vous n'avez pas encore de compositeurs favoris</span>
                        </div>
                       <Button className={"red-full"} text={"Voir tout"} isArrow={true} link={"/signets/compositeur"}/>
                    </div>
                </div>
            </div>
            <SidebarLibrary/>
        </div>
    );
}

export default Signets;