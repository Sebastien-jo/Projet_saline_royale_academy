import React from 'react';
import "../../styles/components/button.css";
import arrow from "../../assets/icones/icon-arrow-White.svg";

const Button = ({isArrow = false, isIcon = false, icon = "", text, link, className}) => {

    return(
        <a className={`button ${className}`} href={link}>
            { isIcon ? <img src={icon} /> : null }
            { text !== "" ? text : null }
            { isArrow ? <img src={arrow} className={"isArrow"}/>  : null }
        </a>
    )
}

export default Button;