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
                        link: "masterclass"
                    },
                    {
                        name: "Oeuvres",
                        link: "oeuvres"
                    },
                    {
                        name: "Compositeur",
                        link: "compositeur"
                    }]}/>

            </div>
            <SidebarLibrary/>
        </div>
    );
}

export default Library;