import React from 'react';
import MenuBar from "../../../components/navbar/MenuBar";
import ListLibraryCompositors from "../../../components/list/listLibraryCompositors";
import "../../../styles/library.css";
import SidebarLibrary from "../../../components/sidebar/sidebarLibrary";

const CompositeurLibrary = () => {
    return (
        <div className="main-container">
            <div className="main-content isSidebar">
                <MenuBar items={[
                    {
                        name: "Masterclass",
                        link: "/library/masterclass",
                        isLinkActive: false,
                    },
                    {
                        name: "Oeuvres",
                        link: "/library/oeuvres",
                        isLinkActive: false,
                    },
                    {
                        name: "Compositeur",
                        link: "/library/compositeur",
                        isLinkActive: true,

                    }]}/>

            </div>
            <SidebarLibrary/>
        </div>
    );
}

export default CompositeurLibrary;