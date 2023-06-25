import React from "react";
import "../../styles/components/card.css";
import Button from "../button/button";
import Pastille from "../pastille/pastille";
import icon from "../../assets/icones/icon-chevron-White-stroke.svg";


const CardColumn = () => {

        return (
            <div className="card-column">
                <div className="card-image">
                    <img src="https://images.unsplash.com/photo-1452724931113-5ab6340ce080?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" alt="image" />
                </div>

                <div className="card-content">
                    <div className="card-header">
                        <div className="card-title-infos">
                            <h3>Nom de l'oeuvre</h3>
                            <span className={"title-subtitle"}>Compositeur : Jean Levin</span>
                        </div>
                        <Pastille text={"Piano"} color={"red"} />
                    </div>

                    <div className="card-body">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>

                    <Button className={"blue-full"} isIcon={true} icon={icon} link={"#"} />
                </div>

            </div>
        );
}

export default CardColumn;