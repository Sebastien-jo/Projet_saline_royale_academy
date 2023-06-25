import React from 'react';
import Button from "../button/button";

const CardRow = ({title, subtitle, text, bouton, link, image}) => {

    return(
        <div className="card-row">
            <div className="card-row__image">
                <img src={image} alt="image"/>
            </div>
            <div className="card-row__content">
                <h2>{title}</h2>
                <h3 className={"subtitle"}>{subtitle}</h3>
                <p>{text}</p>
                <Button text={bouton} link={link} className={"blue-full"} isArrow={true}/>
            </div>
        </div>
    )
}

export default CardRow;