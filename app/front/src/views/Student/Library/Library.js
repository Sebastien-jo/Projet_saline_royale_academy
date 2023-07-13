import React from "react";
import MenuBar from "../../../components/navbar/MenuBar";
import ListLibraryCompositors from "../../../components/list/listLibraryCompositors";
import "../../../styles/library.css";
import SidebarLibrary from "../../../components/sidebar/sidebarLibrary";

const Library = () => {
    return (
        <div className="main-container">
            <div className="main-content isSidebar">
                <MenuBar items={[
                    {
                        name: "Masterclass",
                        link: "/library/masterclass",
                    },
                    {
                        name: "Oeuvres",
                        link: "/library/oeuvres",
                    },
                    {
                        name: "Compositeur",
                        link: "/library/compositeur",
                    }]}/>

            </div>
            <SidebarLibrary/>
        </div>
    );
}

export default Library;