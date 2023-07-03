import React from "react";
import "../../styles/components/sidebar.css";
import Pastille from "../pastille/pastille";
import Button from "../button/button";

const SidebarProgress = () => {
    return (
        <div className="sidebar">
            <h3>Mon historique</h3>
            <div className="sidebar__content no-gap">
                <div className={"sidebar__row passed"}>
                    <p>Cours suivis</p>
                    <span>3</span>
                </div>
                <div className={"sidebar__row passed"}>
                    <p>Temps d'apprentissage</p>
                    <span>6h55min</span>
                </div>
                <div className={"sidebar__row passed"}>
                    <p>Nombre d'exercices passés</p>
                    <span>18</span>
                </div>
                <div className={"sidebar__row historique"}>
                    <p>Badge obtenus</p>
                    <span>3</span>
                </div>




                <div className={"sidebar__history"}>
                    historique
                </div>
            </div>
        </div>
    );
}

export default SidebarProgress;