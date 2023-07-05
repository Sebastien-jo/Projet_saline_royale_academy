import React from "react";
import SidebarLibrary from "../../../components/sidebar/sidebarLibrary";
import Button from "../../../components/button/button";
import "../../../styles/signets.css";
import {useTranslation} from "react-i18next";

const Signets = () => {

    const { i18n, t } = useTranslation();


    return (
        <div className="main-container">
            <div className="main-content">
                <h2>{ t('signets.title') }</h2>
                <div className="signets-container">
                    <div className="signets-card">
                        <div className="signets-card-header">
                            <h1>{ t('signets.masterclass_title') }</h1>
                            <span className="subtitle">{ t('signets.masterclass_subtitle') }</span>
                        </div>
                        <Button className={"red-full"} text={ t('bouton.voir_tout') } isArrow={true} link={"/signets/masterclass"}/>
                    </div>

                    <div className="signets-card">
                        <div className="signets-card-header">
                            <h1>{ t('signets.oeuvres_title') }</h1>
                            <span className="subtitle">{ t('signets.oeuvres_subtitle') }</span>
                        </div>
                        <Button className={"red-full"} text={ t('bouton.voir_tout') } isArrow={true} link={"/signets/oeuvres"}/>
                    </div>

                    <div className="signets-card">
                        <div className="signets-card-header">
                            <h1>{ t('signets.composer_title') }</h1>
                            <span className="subtitle">{ t('signets.composer_subtitle') }</span>
                        </div>
                       <Button className={"red-full"} text={ t('bouton.voir_tout') } isArrow={true} link={"/signets/compositeur"}/>
                    </div>
                </div>
            </div>
            <SidebarLibrary/>
        </div>
    );
}

export default Signets;