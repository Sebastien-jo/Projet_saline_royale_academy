import React from 'react';
import Button from "../button/button";
import icon from "../../assets/icones/icon-chevron-White-stroke.svg";
import pen from "../../assets/icones/icon-edit-White-stroke.svg";

const CardExercices = ({title, subtitle, text, bouton, link, image}) => {
    return(
        <div className="card-row">
            <div className="card-row__image">
                <img src={image} alt="image"/>
            </div>
            <div className="card-row__content">
                <h2>{title}</h2>
                <h3 className={"subtitle"}>{subtitle}</h3>
                <p>{text}</p>
                <Button text="Supprimer" className={"red-stroke"} isArrow={true}/>
                <Button text="Modifier" className={"blue-full"} isIcon={true} icon={pen}/>
            </div>
        </div>
    )
}

export default CardExercices;