import React from "react";
import DarkLightSwitch from "./DarkLightSwitch";
import {Link} from "react-router-dom";

const TitleBar = ({title}) => {

    return (
        <div className="titleBar">
            <div className="titleBar_start">
                <div className="titleBar__infos">
                    <h1 className="titleBar__infos__title">title</h1>
                    <div className="titleBar__infos__subtitle">Saline Royale Academy</div>
                </div>
            </div>

            <div className="titleBar__end">
                <Link to="/account" className="navbar__user__avatar">
                    <div className="navbar__user__avatar__img"></div>
                </Link>
            </div>

        </div>
    );
}

export default TitleBar;