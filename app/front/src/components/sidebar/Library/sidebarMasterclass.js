import React from "react";
import "../../../styles/components/sidebar.css";
import Pastille from "../../pastille/pastille";
import Button from "../../button/button";
import useSidebarContent from "../../../hooks/useSidebarContent";
import {useParseDate} from "../../../hooks/useParseDate";
import useMasterclassUser from "../../../hooks/api/useMasterclassUser";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

const SidebarMasterclass = ({ content, clearSidebarContent }) => {
    const {parseDate} = useParseDate();

    const {handlePost} = useMasterclassUser();
    const navigate = useNavigate();

    const { i18n, t } = useTranslation();

    const handleStart = () => {
        handlePost(content.id).then((response) => {
            console.log(response);
            navigate(`/masterclass/${response.masterclassUserId}`);
            clearSidebarContent();
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className="sidebar">
            <h3>{t('sidebarData.title')}</h3>
            <div className="sidebar__content">
                <div className="sidebar__img">
                    <img src={content.masterclassImage ? content.masterclassImage.contentUrl : "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2938&q=80"} alt="Image" />
                </div>
                <div className="sidebar__content">
                    <div className="sidebar__header">
                        <h2>{ content.name }</h2>
                        <Pastille text={content.work.category.name} className={content.work.category.name.toLowerCase()} />

                    </div>
                    <span className={"title-subtitle"}>{t('card.professor')} : {content.teacher.firstName} {content.teacher.lastName}</span>
                    <span className={"title-subtitle"}>{t('card.date')} : { parseDate(content.createdAt) }</span>

                    <p>{content.description}</p>
                    {
                        content.started ?
                            <Button className={"red-full"} text={t('bouton.continu')} link={`#/masterclass/${content.id}` } click={clearSidebarContent} />
                            :
                            <Button className={"red-full"} text={t('bouton.start')} click={handleStart} />
                    }
                </div>
            </div>
        </div>
    )
}

export default SidebarMasterclass;