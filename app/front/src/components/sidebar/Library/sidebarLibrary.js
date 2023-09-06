import React from "react";
import "../../../styles/components/sidebar.css";
import Pastille from "../../pastille/pastille";
import Button from "../../button/button";
import useSidebarContent from "../../../hooks/useSidebarContent";
import SidebarWork from "./sidebarWork";
import SidebarMasterclass from "./sidebarMasterclass";
import SidebarComposer from "./sidebarComposer";

const SidebarLibrary = ({ sidebarContent, clearSidebarContent, type }) => {

    // Return null if no content is provided
    if (!sidebarContent) {
        return null;
    }

    console.log(sidebarContent);

    return sidebarContent ?(
        type === "work" ?
            <SidebarWork content={sidebarContent} clearSidebarContent={clearSidebarContent} />
            : type === "composer" ?
            <SidebarComposer content={sidebarContent} clearSidebarContent={clearSidebarContent} />
            :
                <SidebarMasterclass content={sidebarContent} clearSidebarContent={clearSidebarContent} />
    ) : null;
}

export default SidebarLibrary;