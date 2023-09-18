import React from "react";
import CardFull from "../../components/card/cardFull";
import ListHome from "../../components/list/listHome";
import "../../styles/home.css";
import SidebarLibrary from "../../components/sidebar/Library/sidebarLibrary";
import {useTranslation} from "react-i18next";
import masterclass from "../../assets/images/masterclass.jpg";
import SidebarProgress from "../../components/sidebar/sidebarProgress";

const Home = () => {

    const { i18n, t } = useTranslation();


    return (
        <div className="main-container">
            <div className="main-content isSidebar">
                <div className={"row-container"}>
                    <CardFull title={ t('home.card_new_masterclass') } bouton={ t('bouton.découvrir') } link={"#/library/masterclass"} background={masterclass}/>
                    <CardFull title={ t('home.card_new_events') } bouton={ t('bouton.participer') } link={"#"} background={"https://picsum.photos/900/1000"} isPopup/>
                </div>

                <div className={"column-container"}>
                    <ListHome title={ t('home.section_masterclass') } isFilter={true}/>
                </div>
            </div>
            <SidebarProgress isHome={true}/>
        </div>
    );
}

export default Home;