import React, {useEffect, useState} from "react";
import MenuBar from "../../../components/navbar/MenuBar";
import SidebarLibrary from "../../../components/sidebar/Library/sidebarLibrary";
import {getMasterclasses} from "../../../api/endpoints/masterclass";
import useMasterclass from "../../../hooks/api/useMasterclass";
import ListMasterclass from "../../../components/list/listMasterclass";
import useFavoris from "../../../hooks/api/useFavoris";
import useSidebarContent from "../../../hooks/useSidebarContent";

const Masterclass = () => {

    const [masterclass, setMasterclass] = useState(false); // [state, function to update state
    const {loading, error, handleGetAllFavorisMasterclass} = useFavoris();
    const { sidebarContent, updateSidebarContent, clearSidebarContent } = useSidebarContent();


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
            <div className="main-content isSidebar menuTabs">
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

                <ListMasterclass masterclass={masterclass ? masterclass : false} error={error} updateSidebarContent={updateSidebarContent} loading={loading} />
            </div>
            <SidebarLibrary sidebarContent={sidebarContent} clearSidebarContent={clearSidebarContent} type={"masterclass"} />
        </div>
    );
}

export default Masterclass;