import React from "react";
import DarkLightSwitch from "./DarkLightSwitch";
import "../../styles/components/titlebar.css";
import { useAuth } from "../../hooks/api/useAuth";
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


const TitleBar = () => {
    const { handleLogout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();


    const goBack = () => {
        navigate(-1);
    };

    //get title from the state
    const title = location;

    console.log(title);
    return (
        <div className="titleBar">
            <div className="titleBar_start">
                <div className="titleBar__back_arrow" onClick={goBack}></div>
                <div className="titleBar__infos">
                    <h1 className="titleBar__infos__title">{title.state !== null ? title.state.title : "Title"}</h1>
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
