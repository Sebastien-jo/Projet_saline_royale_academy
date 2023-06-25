import React from "react";
import MenuBar from "../../components/navbar/MenuBar";
import ListLibrary from "../../components/list/listLibrary";
import SidebarLibrary from "../../components/sidebar/sidebarLibrary";

const Oeuvres = () => {

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
                        isLinkActive: true,
                    },
                    {
                        name: "Compositeur",
                        link: "/signets/compositeur",
                        isLinkActive: false,
                    }]}/>
                <ListLibrary/>
            </div>
            <SidebarLibrary/>
        </div>
    );
}

export default Oeuvres;