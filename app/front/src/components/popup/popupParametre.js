import React, {useState, useEffect} from 'react';
import "../../styles/components/popup.css";
import { useTranslation } from 'react-i18next';

import Button from "../button/button";
import {
    applyDarkModeStyles,
    loadDarkModePreference,
    removeDarkModeStyles,
    saveDarkModePreference
} from "../../utils/darkModeUtils";

const PopupParametre = ({closePopup = false}) => {

    const [isOpened, setIsOpened] = useState(closePopup);
    const { i18n, t } = useTranslation();
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleLinkClick = () => {
        setIsOpened(!isOpened);
    }

    useEffect(() => {
        setIsOpened(closePopup);
    }, [closePopup]);

    useEffect(() => {
        // Load the user's dark mode preference
        const darkModePreference = loadDarkModePreference();
        const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;


        if (darkModePreference === "true" || (!darkModePreference && prefersDarkMode)) {
            // If the preference is true, enable dark mode
            setIsDarkMode(true);
            applyDarkModeStyles();
            saveDarkModePreference(true);
        } else {
            // If the preference is false or not set, disable dark mode
            setIsDarkMode(false);
            removeDarkModeStyles();
            saveDarkModePreference(false);
        }
    }, []);

    const handleSwitchToggle = (e) => {
        console.log(e.target.value);
        setIsDarkMode((prevMode) => !prevMode);

        if (e.target.value === "light") {
            removeDarkModeStyles();
            saveDarkModePreference(false);
        } else {
            applyDarkModeStyles();
            saveDarkModePreference(true);
        }
    }

    return(
        <div className={`popup-container ${isOpened ? "open" : "close"}`}>
            <div className="popup-content">
                <div className="popup-close" onClick={() => handleLinkClick()}></div>
                <div className="popup-header">
                    <h1 className="popup-title">{ t('parametre.title') }</h1>
                    <span>{ t('parametre.subtitle') }</span>
                </div>

                <div className="popup-body">
                    <div className="popup-body-row">
                        <h2 className="popup-body-title">{ t('parametre.langue') }</h2>
                        <select className="popup-body-select" onChange={(e) => i18n.changeLanguage(e.target.value)}>
                            <option value="fr">{ t('parametre.français') }</option>
                            <option value="en">{ t('parametre.anglais') }</option>
                        </select>
                    </div>

                    <div className="popup-body-row">
                        <h2 className="popup-body-title">{ t('parametre.theme') }</h2>
                        <select className="popup-body-select" onChange={(e) => handleSwitchToggle(e)}>
                            <option value="light">{ t('parametre.clair') }</option>
                            <option value="dark">{ t('parametre.sombre') }</option>
                        </select>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default PopupParametre;