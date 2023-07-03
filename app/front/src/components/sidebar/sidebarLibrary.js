import React from "react";
import "../../styles/components/sidebar.css";
import Pastille from "../pastille/pastille";
import Button from "../button/button";

const SidebarLibrary = () => {
    return (
        <div className="sidebar">
            <h3>Titre de la sidebar</h3>
            <div className="sidebar__content">
                <div className="sidebar__img">
                    <img src="https://images.unsplash.com/photo-1452724931113-5ab6340ce080?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" alt="Image" />
                </div>
                <div className="sidebar__content">
                    <div className="sidebar__header">
                        <h2>Titre de la sidebar</h2>
                        <Pastille text={"Piano"} color={"red"} />
                    </div>
                    <span className={"title-subtitle"}>Compositeur : Jean Levin</span>
                    <span className={"title-subtitle"}>Date : 06 mai 2023</span>

                    <p>Lorem ipsum dolor sit amet consectetur. Maecenas feugiat sed platea vulputate vulputate fringilla sit convallis in. Aliquet aliquam ullamcorper magna mauris hendrerit tellus dignissim cras eget. Tellus at cursus sagittis senectus ut mollis.
                        Ac in augue nisl porta maecenas interdum consequat scelerisque sollicitudin.</p>

                    <Button className={"red-full"} text={"Voir plus"} link={"#"} isArrow={true} />
                </div>
            </div>
        </div>
    );
}

export default SidebarLibrary;