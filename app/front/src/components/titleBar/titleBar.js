import React, {useEffect} from "react";
import DarkLightSwitch from "./DarkLightSwitch";
import "../../styles/components/titlebar.css";

const titleBar = ({title}) => {

    return (
        <div className="titleBar">
            <div className="titleBar_start">
                <div className="titleBar__back_arrow"></div>
                <div className="titleBar__infos">
                    <h1 className="titleBar__infos__title">{title}</h1>
                    <div className="titleBar__infos__subtitle">Saline Royale Academy</div>
                </div>
            </div>

            <div className="titleBar__end">
               <DarkLightSwitch />
            </div>

        </div>
    );
}

export default titleBar;