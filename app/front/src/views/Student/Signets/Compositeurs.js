import React, {useEffect, useState} from "react";
import MenuBar from "../../../components/navbar/MenuBar";
import ListLibraryCompositors from "../../../components/list/listLibraryCompositors";
import SidebarLibrary from "../../../components/sidebar/sidebarLibrary";
import {getCompositors} from "../../../api/endpoints/compositor";

const Compositeurs = () => {

    const [compositors, setCompositors] = useState([]); // [state, function to update state

    //call api to get list of composers
    useEffect(() => {
        /*getCompositors().then((response) => {
            setCompositors(response['hydra:member']);
        }).catch((error) => {
            console.log(error);
        });*/

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
                <ListLibraryCompositors list={compositors}/>
            </div>
            <SidebarLibrary/>
        </div>
    );
}

export default Compositeurs;