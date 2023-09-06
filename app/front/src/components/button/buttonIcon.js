import React from 'react';
import arrow from "../../assets/icones/icon-arrow-White.svg";

const ButtonIcon = ({icon, className, link = "", click}) => {
    return(
        <>
            {
                link !== "" ?
                    <a className={`button-round ${className}`} href={link}>
                        <img src={icon} className={"isArrow"}/>
                    </a>
                    :
                    <button className={`button-round ${className}`} onClick={click}>
                        <img src={icon} className={"isArrow"}/>
                    </button>

            }
        </>
    )
}

export default ButtonIcon;