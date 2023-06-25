import React from "react";
import MenuBar from "../../components/navbar/MenuBar";
import ListLibrary from "../../components/list/listLibrary";
import "../../styles/library.css";
import SidebarLibrary from "../../components/sidebar/sidebarLibrary";

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
                <ListLibrary/>
            </div>
            <SidebarLibrary/>
        </div>
    );
}

export default Library;