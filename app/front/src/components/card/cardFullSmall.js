import React from 'react';
import Button from "../button/button";
import chevron from "../../assets/icones/icon-chevron-White-stroke.svg";
import ButtonFavoris from "../button/ButtonFavoris";
import ButtonIcon from "../button/buttonIcon";

const CardFullSmall = ({id, title, subtitle, background, link}) => {
    return(
        <div className="card-full-small" style={{background: `linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${background}) no-repeat center/cover`}}>
            <ButtonFavoris favoris={"masterclass"} id={id}/>
            <div>
                <h1>{title}</h1>
                {subtitle !== "" ? <p>{subtitle}</p> : null}
            </div>
            <ButtonIcon icon={chevron} className={"blue"} link={link}/>
        </div>

    )
}

export default CardFullSmall;