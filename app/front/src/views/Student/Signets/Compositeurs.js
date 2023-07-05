import React, {useEffect} from "react";
import MenuBar from "../../../components/navbar/MenuBar";
import ListLibrary from "../../../components/list/listLibrary";
import SidebarLibrary from "../../../components/sidebar/sidebarLibrary";
import {getCompositors} from "../../../api/endpoints/compositor";

const Compositeurs = () => {

    //call api to get list of composers
    useEffect(() => {
        console.log("useEffect");
        //call api
        getCompositors().then((response) => {
            console.log(response);
        }
        ).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <div className="main-container">
            <div className="main-content isSidebar">
                <MenuBar items={[
                    {
                        name: "Masterclass",
                        link: "/signets/masterclass",
                        isLinkActive: false,
                    },
                    {
                        name: "Oeuvres",
                        link: "/signets/oeuvres",
                        isLinkActive: false,
                    },
                    {
                        name: "Compositeur",
                        link: "/signets/compositeur",
                        isLinkActive: true,

                    }]}/>
                <ListLibrary/>
            </div>
            <SidebarLibrary/>
        </div>
    );
}

export default Compositeurs;