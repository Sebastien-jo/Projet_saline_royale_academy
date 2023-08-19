import React from "react";
import "../../styles/components/sidebar.css";
import Pastille from "../pastille/pastille";
import Button from "../button/button";
import useSidebarContent from "../../hooks/useSidebarContent";

const SidebarLibrary = ({ sidebarContent, clearSidebarContent, type }) => {

    // Return null if no content is provided
    if (!sidebarContent) {
        return null;
    }

    console.log(sidebarContent);

    return sidebarContent ?(
        <div className="sidebar">
            <h3>Aperçu</h3>
            <div className="sidebar__content">
                <div className="sidebar__img">
                    <img src="https://images.unsplash.com/photo-1452724931113-5ab6340ce080?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" alt="Image" />
                </div>
                <div className="sidebar__content">
                    <div className="sidebar__header">
                        <h2>{ sidebarContent.name }</h2>
                        {
                            sidebarContent.categories ?
                                sidebarContent.categories.map((item, index) => {
                                        return(
                                            <Pastille key={index} text={item.name} className={item.name} />
                                        )
                                    }
                                )
                                :
                                <Pastille text={sidebarContent.category.name} className={sidebarContent.category.name} />
                        }
                    </div>
                    <span className={"title-subtitle"}>Compositeur : Jean Levin</span>
                    <span className={"title-subtitle"}>Date : 06 mai 2023</span>

                    <p>{sidebarContent.description}</p>
                    <Button className={"red-full"} text={"Voir plus"} link={
                                type === "work" ? `#/oeuvre/${sidebarContent.id}`
                            : type === "masterclass" ? `#/masterclass/${sidebarContent.id}`
                            : type === "composer" ? `#/compositeur/${sidebarContent.id}`
                            : null
                    } click={clearSidebarContent} />
                </div>
            </div>
        </div>
    ) : null;
}

export default SidebarLibrary;