import React from "react";
import SidebarLibrary from "../components/sidebar/sidebarLibrary";
import CardFull from "../components/card/cardFull";
import Pastille from "../components/pastille/pastille";
import CardMyStudy from "../components/card/cardMyStudy";
import CardFullSmall from "../components/card/cardFullSmall";
import "../styles/myStudy.css";


const MyStudy = () => {

    const test = [1,2,3,4,5];

    return (
        <div className="main-container">
            <div className="main-content">

                <CardMyStudy />

                <div className="other-study">
                    <h2>Autres cours que vous pourriez aimer</h2>
                    <div className={"other-study-cards"}>
                        {
                            test.map((item, index) => {
                                return(
                                    <CardFullSmall title={"Titre masterclass"} subtitle={"Compositeur : Jean Levin"} background={"https://picsum.photos/900/1000"}/>
                                )
                            })
                        }
                    </div>

                </div>

            </div>

            <SidebarLibrary/>
        </div>
    );
}

export default MyStudy;