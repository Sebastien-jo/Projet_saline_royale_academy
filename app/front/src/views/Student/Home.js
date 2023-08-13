import React from "react";
import CardFull from "../../components/card/cardFull";
import ListHome from "../../components/list/listHome";
import "../../styles/home.css";
import ListCompositors from "../../components/list/listCompositors";
import SidebarLibrary from "../../components/sidebar/sidebarLibrary";
import {useTranslation} from "react-i18next";

const Home = () => {

    const { i18n, t } = useTranslation();


    return (
        <div className="main-container">
            <div className="main-content">
                <div className={"row-container"}>
                    <CardFull title={ t('home.card_new_masterclass') } bouton={ t('bouton.découvrir') } link={"#/mystudy"} background={"https://picsum.photos/900/1000"}/>
                    <CardFull title={ t('home.card_new_events') } bouton={ t('bouton.participer') } link={"#"} background={"https://picsum.photos/900/1000"} isPopup/>
                </div>

                <div className={"column-container"}>

                    <ListHome title={ t('home.section_masterclass') } isFilter={true}/>

                </div>

                <div className={"column-container"}>
                </div>
            </div>
            <SidebarLibrary/>
        </div>
    );
}

export default Home;