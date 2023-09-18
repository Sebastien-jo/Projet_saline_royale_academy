import React from "react";
import {useSelector} from "react-redux";
import {useAuth} from "../../hooks/api/useAuth";
import "../../styles/components/titlebar.css";
import DarkLightSwitch from "./DarkLightSwitch";

const TitleBar = ({title}) => {

    const user = useSelector(state => state.auth.user);
    const { handleLogout } = useAuth();


    return (
        <div className="titleBar">
            <div className="titleBar_start">
                <div className="titleBar__infos">
                    <h1 className="titleBar__infos__title">title</h1>
                    <div className="titleBar__infos__subtitle">Saline Royale Academy</div>
                </div>
            </div>

            <div className="titleBar__end">
                <DarkLightSwitch />
                <button className="logout" onClick={handleLogout}></button>
            </div>
        </div>
    );
}

export default TitleBar;