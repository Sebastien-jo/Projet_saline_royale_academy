import React from 'react';
import Button from "../button/button";
import icon from "../../assets/icones/icon-chevron-White-stroke.svg";

const CardFull = ({title, bouton, link, background}) => {
    return(
        <div className="card-full" style={{background: `linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${background}) no-repeat center/cover`}}>
            <h1>{title}</h1>
            <Button text={bouton} link={link} className={"red-full"} isIcon={true} icon={icon}/>
        </div>
    )
}

export default CardFull;