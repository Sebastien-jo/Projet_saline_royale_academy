import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import CardFullSmall from "../card/cardFullSmall";
import Button from "../button/button";
import icon_delete from "../../assets/icones/icon-trash-White.svg";
import icon_cross from "../../assets/icones/icon-cross-Blue-full.svg";

const PopupEvent = ({openPopup = false, setOpen, title, text, deleteFunc}) => {

    const [isOpened, setIsOpened] = useState(openPopup);
    const { i18n, t } = useTranslation();

    const handleLinkClick = () => {
        setIsOpened(false);
        setOpen(false);
    }

    useEffect(() => {
        setIsOpened(openPopup);
    }, [openPopup]);

    return(
        <div className={`popup-container small ${isOpened ? "open" : "close"}`}>
            <div className="popup-content">
                <div className="popup-close" onClick={() => handleLinkClick()}></div>
                <div className="popup-header">
                    <h1 className="popup-title">{title}</h1>
                    <span>{text}</span>
                </div>

                <div className="popup-body">
                    <Button text={"Annuler"} className={"blue-stroke"} isIcon={true} icon={icon_cross} click={() => setOpen(false)} />
                    <Button text={"Supprimer"} className={"red-full"} isIcon={true} icon={icon_delete} onClick={() => deleteFunc()} />
                </div>
            </div>
        </div>
    )
}

export default PopupEvent;