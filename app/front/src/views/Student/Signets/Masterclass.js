import React, {useEffect, useState} from "react";
import MenuBar from "../../../components/navbar/MenuBar";
import SidebarLibrary from "../../../components/sidebar/Library/sidebarLibrary";
import {getMasterclasses} from "../../../api/endpoints/masterclass";
import useMasterclass from "../../../hooks/api/useMasterclass";
import ListMasterclass from "../../../components/list/listMasterclass";
import useFavoris from "../../../hooks/api/useFavoris";

const Masterclass = () => {

    const [masterclass, setMasterclass] = useState(false); // [state, function to update state
    const {loading, error, handleGetAllFavorisMasterclass} = useFavoris();

    useEffect(() => {
        handleGetAllFavorisMasterclass().then((response) => {
            setMasterclass(response.map((masterclass) => {
                return masterclass.masterclass;
            }));
            console.log(response);
        }).catch((error) => {
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

                <ListMasterclass masterclass={masterclass ? masterclass : false} error={error}/>
            </div>
            <SidebarLibrary/>
        </div>
    );
}

export default Masterclass;