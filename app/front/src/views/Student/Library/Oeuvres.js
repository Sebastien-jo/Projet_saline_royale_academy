import React from 'react';
import MenuBar from "../../../components/navbar/MenuBar";
import ListLibrary from "../../../components/list/listLibrary";
import "../../../styles/library.css";
import SidebarLibrary from "../../../components/sidebar/sidebarLibrary";

const OeuvresLibrary = () => {
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
                        isLinkActive: true,
                    },
                    {
                        name: "Compositeur",
                        link: "/library/compositeur",
                        isLinkActive: false,
                    }]}/>
                <ListLibrary/>
            </div>
            <SidebarLibrary/>
        </div>
    );
}

export default OeuvresLibrary;