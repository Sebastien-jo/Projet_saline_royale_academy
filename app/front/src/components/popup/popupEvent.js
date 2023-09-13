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
                    <h1 className="popup-title">{ t('popupEvent.title') }</h1>
                    <span>{ t('popupEvent.subtitle') }</span>
                </div>

                <div className="popup-body">
                    {/*<div className="popup-body-grid">
                        {
                            test.map((item, index) => {
                                return (
                                    <CardFullSmall title={"Masterclass de test"} subtitle={"Sous-titre de test"} link={"#/signets/masterclass"} key={index}/>
                                )
                            })
                        }
                    </div>*/}
                    <p>
                        { t('popupEvent.no_event') }
                        <br/>
                        { t('popupEvent.no_event_more') }
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PopupEvent;