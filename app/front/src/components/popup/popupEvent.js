import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import CardFullSmall from "../card/cardFullSmall";

const PopupEvent = ({openPopup = false, setOpen}) => {

    const [isOpened, setIsOpened] = useState(openPopup);
    const { i18n, t } = useTranslation();

    const handleLinkClick = () => {
        setIsOpened(false);
        setOpen(false);
    }

    useEffect(() => {
        setIsOpened(openPopup);
    }, [openPopup]);

    const test = [1,2,3,4];

    return(
        <div className={`popup-container ${isOpened ? "open" : "close"}`}>
            <div className="popup-content">
                <div className="popup-close" onClick={() => handleLinkClick()}></div>
                <div className="popup-header">
                    <h1 className="popup-title">Nos prochaines masterclass</h1>
                    <span>Recevez une notifications dès qu'un de nos nouvelles masterclass seras ajoutés </span>
                </div>

                <div className="popup-body">
                    <div className="popup-body-grid">
                        {
                            test.map((item, index) => {
                                return (
                                    <CardFullSmall title={"Masterclass de test"} subtitle={"Sous-titre de test"} link={"/signets/masterclass"} key={index}/>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopupEvent;