import React from 'react';
import CardFull from "./cardFull";
import Pastille from "../pastille/pastille";
import "../../styles/components/card.css";
import {useParseDate} from "../../hooks/useParseDate";
import {useTranslation} from "react-i18next";

const CardMyStudy = ({masterclass}) => {

    const {parseDate} = useParseDate();
    const { i18n, t } = useTranslation();

    return(
        <div className="mystudy-container">
            <div className={"mystudy-card"}>
                <CardFull title={ t('cardMyStudy.title')} bouton={ t('bouton.continuer')} link={"#/masterclass/" + masterclass.id} background={masterclass.masterclass.masterclassImage ? masterclass.masterclass.masterclassImage.contentUrl : "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2938&q=80"}/>
            </div>

            <div className={"mystudy-content"}>
                <div className={"mystudy-infos"}>
                    <div className={"mystudy-header"}>
                        <h2>{masterclass.masterclass.name}</h2>
                        <Pastille text={masterclass.masterclass.work.category.name} color={masterclass.masterclass.work.category.name}/>
                    </div>

                    <span className={"subtitle"}>{ t('card.professor')} : { masterclass.masterclass.teacher.firstName } { masterclass.masterclass.teacher.flastName }</span>
                    <span className={"subtitle"}>{ t('card.date')} : { parseDate(masterclass.masterclass.createdAt) }</span>
                    <p>{ t('cardMyStudy.text')} {masterclass.masterclass.work.name}</p>
                </div>
            </div>
        </div>
    )
}

export default CardMyStudy;