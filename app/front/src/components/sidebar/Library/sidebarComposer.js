import React from "react";
import "../../../styles/components/sidebar.css";
import Pastille from "../../pastille/pastille";
import Button from "../../button/button";
import {useParseDate} from "../../../hooks/useParseDate";
import {useTranslation} from "react-i18next";

const SidebarComposer = ({ content, clearSidebarContent }) => {

    const {parseDate} = useParseDate();
    const { i18n, t } = useTranslation();

    return (
        <div className="sidebar">
            <h3>{t('sidebarData.title')}</h3>
            <div className="sidebar__content">
                <div className="sidebar__img">
                    <img src={content.composerImage ? content.composerImage.contentUrl : "https://images.unsplash.com/photo-1621368286550-f54551f39b91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"} alt={content.name} />
                </div>
                <div className="sidebar__content">
                    <div className={"sidebar__header"}>
                    {
                        content.categories ?
                            content.categories.map((item, index) => {
                                    return(
                                        <Pastille key={index} text={item.name} className={item.name.toLowerCase()} />
                                    )
                                }
                            )
                            :
                            <Pastille text={content.category.name} className={content.category.name.toLowerCase()} />

                    }
                    </div>
                    <div className="sidebar__header">
                        <h2>{ content.name }</h2>
                    </div>
                    <span className={"title-subtitle"}>{t('card.composer')} : {content.completeName}</span>
                    <span className={"title-subtitle"}>{t('card.birth')} : { parseDate(content.birth) }</span>
                    { content.death ? <span className={"title-subtitle"}>{t('card.death')} : { parseDate(content.death) }</span> : null }
                    <span className={"title-subtitle"}>{t('card.nationality')}: {content.nationality}</span>

                    <p>{content.description}</p>
                    <Button className={"red-full"} text={t('bouton.see_more')} link={ `#/compositeur/${content.id}` } click={clearSidebarContent} />
                </div>
            </div>
        </div>
    );
}

export default SidebarComposer;