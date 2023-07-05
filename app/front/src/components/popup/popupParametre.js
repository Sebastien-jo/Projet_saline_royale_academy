import React, {useState, useEffect} from 'react';
import "../../styles/components/popupParams.css";

import Button from "../button/button";

const PopupParametre = ({closePopup = false}) => {

    const [isOpened, setIsOpened] = useState(closePopup);
    const { i18n, t } = useTranslation();

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
                        <select className="popup-body-select">
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