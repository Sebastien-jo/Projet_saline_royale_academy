import React, {useEffect, useState} from "react";
import MenuBar from "../../../components/navbar/MenuBar";
import ListCompositors from "../../../components/list/listCompositors";
import SidebarLibrary from "../../../components/sidebar/Library/sidebarLibrary";

import useFavoris from "../../../hooks/api/useFavoris";
import useSidebarContent from "../../../hooks/useSidebarContent";


const Compositeurs = () => {

    const [compositors, setCompositors] = useState(false); // [state, function to update state
    const {loading, error, handleGetAllFavorisComposer} = useFavoris();

    const { sidebarContent, updateSidebarContent, clearSidebarContent } = useSidebarContent();


    useEffect(() => {
        handleGetAllFavorisComposer().then((response) => {
            setCompositors(response.map((composer) => {
                return composer.composer;
            }));
            console.log(response);
        }).catch((err) => {
            console.log(err);
        });
    }, []);


    return (
        <div className="main-container">
            <div className="main-content isSidebar menuTabs">
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
                <ListCompositors compositors={compositors ? compositors : false} error={error} updateSidebarContent={updateSidebarContent} loading={loading}/>

            </div>
            <SidebarLibrary sidebarContent={sidebarContent} clearSidebarContent={clearSidebarContent} type={"composer"} />

        </div>
    );
}

export default Compositeurs;