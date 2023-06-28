import React from "react";
import CardFull from "../../components/card/cardFull";
import ListHome from "../../components/list/listHome";
import "../../styles/home.css";
import ListLibrary from "../../components/list/listLibrary";
import SidebarLibrary from "../../components/sidebar/sidebarLibrary";

const Home = () => {
    return (
        <div className="main-container">
            <div className="main-content">
                <div className={"row-container"}>
                    <CardFull title={"Découvrez et suivez notre nouvelle masterclass "} bouton={"Découvrir"} link={"/masterclass"} background={"https://picsum.photos/900/1000"}/>
                    <CardFull title={"Évènement"} bouton={"Participez"} link={"#"} background={"https://picsum.photos/900/1000"}/>
                </div>

                <div className={"column-container"}>

                    <ListHome title={"Récemment ajoutés"} isFilter={true}/>

                    <ListHome title={"Sélectionnez pour vous "}/>
                </div>

                <div className={"column-container"}>
                </div>
            </div>
            <SidebarLibrary/>
        </div>
    );
}

export default Home;