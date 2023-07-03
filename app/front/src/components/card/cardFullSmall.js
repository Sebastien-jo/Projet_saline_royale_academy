import React from 'react';
import Button from "../button/button";
import chevron from "../../assets/icones/icon-chevron-White-stroke.svg";
import favoris from "../../assets/icones/icon-signet-Blue-stroke.svg";
import ButtonIcon from "../button/buttonIcon";

const CardFullSmall = ({title, subtitle, background}) => {
    return(
        <div className="card-full-small" style={{background: `linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${background}) no-repeat center/cover`}}>
            <ButtonIcon icon={favoris} className={"white signet-button"}/>
            <div>
                <h1>{title}</h1>
                {subtitle !== "" ? <p>{subtitle}</p> : null}
            </div>
            <ButtonIcon icon={chevron} className={"blue"}/>
        </div>

    )
}

export default CardFullSmall;