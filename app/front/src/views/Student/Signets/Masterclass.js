import React, {useEffect, useState} from "react";
import MenuBar from "../../../components/navbar/MenuBar";
import SidebarLibrary from "../../../components/sidebar/sidebarLibrary";
import {getMasterclasses} from "../../../api/endpoints/masterclass";

const Masterclass = () => {

    const [masterclass, setMasterclass] = useState([]);

    useEffect(() => {
        /*getMasterclasses().then((response) => {
            console.log(response);
            setMasterclass(response['hydra:member']);
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
                        isLinkActive: true,
                    },
                    {
                        name: "Oeuvres",
                        link: "/signets/oeuvres",
                        isLinkActive: false,
                    },
                    {
                        name: "Compositeur",
                        link: "/signets/compositeur",
                        isLinkActive: false,
                    }]}/>
            </div>
            <SidebarLibrary/>
        </div>
    );
}

export default Masterclass;