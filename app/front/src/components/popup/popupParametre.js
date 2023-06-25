import React, {useState, useEffect} from 'react';
import "../../styles/components/popupParams.css";

import Button from "../button/button";

const PopupParametre = ({closePopup = false}) => {

    const [isOpened, setIsOpened] = useState(closePopup);

    const handleLinkClick = () => {
        setIsOpened(!isOpened);
    }

    useEffect(() => {
        setIsOpened(closePopup);
    }, [closePopup]);

    return(
        <div className={`popup-container ${isOpened ? "open" : "close"}`}>
            <div className="popup-content">
                <div className="popup-close" onClick={() => handleLinkClick()}></div>
                <div className="popup-header">
                    <h1 className="popup-title">Paramètres</h1>
                    <span>Modifier les paramètres de l'application</span>
                </div>

                <div className="popup-body">
                    <div className="popup-body-row">
                        <h2 className="popup-body-title">Langue</h2>
                        <select className="popup-body-select">
                            <option value="fr">Français</option>
                            <option value="en">Anglais</option>
                        </select>
                    </div>

                    <div className="popup-body-row">
                        <h2 className="popup-body-title">Thème</h2>
                        <select className="popup-body-select">
                            <option value="light">Clair</option>
                            <option value="dark">Sombre</option>
                        </select>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default PopupParametre;