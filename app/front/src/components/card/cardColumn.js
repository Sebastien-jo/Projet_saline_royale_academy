import React from "react";
import "../../styles/components/card.css";
import Button from "../button/button";
import Pastille from "../pastille/pastille";
import icon from "../../assets/icones/icon-chevron-White-stroke.svg";


const CardColumn = ({image, title, subtitle, description, link}) => {

        return (
            <div className="card-column">
                <div className="card-image">
                    <img src={image} alt="image" />
                </div>

                <div className="card-content">
                    <div className="card-header">
                        <div className="card-title-infos">
                            <h3>{ title }</h3>
                            <span className={"title-subtitle"}>{ subtitle }</span>
                        </div>
                        <Pastille text={"Piano"} color={"red"} />
                    </div>

                    <div className="card-body">
                        <p>{description}</p>
                    </div>

                    <Button className={"blue-full"} isIcon={true} icon={icon} link={link} />
                </div>

            </div>
        );
}

export default CardColumn;