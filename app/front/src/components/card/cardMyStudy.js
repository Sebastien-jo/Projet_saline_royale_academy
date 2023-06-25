import React from 'react';
import CardFull from "./cardFull";
import Pastille from "../pastille/pastille";

import "../../styles/components/card.css";

const CardMyStudy = () => {

    return(
        <div className="mystudy-container">
            <div className={"mystudy-card"}>
                <CardFull title={"Découvrez et suivez notre nouvelle masterclass "} bouton={"Découvrir"} link={"/masterclass"} background={"https://picsum.photos/900/1000"}/>
            </div>

            <div className={"mystudy-content"}>
                <div className={"mystudy-infos"}>
                    <div className={"mystudy-header"}>
                        <h2>Nom de l'oeuvre</h2>
                        <Pastille text={"Piano"} color={"#FFC107"}/>
                    </div>

                    <span className={"subtitle"}>Compositeur : Jean Levin</span>
                    <span className={"subtitle"}>Durée : 1h30</span>
                    <span className={"subtitle"}>Date : 12/12/2021</span>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>

                <div className={"mystudy-progress"}>

                </div>





            </div>
        </div>
    )
}

export default CardMyStudy;