import React from "react";
import "../../../styles/components/sidebar.css";
import Pastille from "../../pastille/pastille";
import Button from "../../button/button";
import bg_work from "../../../assets/images/bg_work.jpg";
import {useParseDate} from "../../../hooks/useParseDate";

const SidebarWork = ({ content, clearSidebarContent }) => {

    const {parseDate} = useParseDate();

    return (
        <div className="sidebar">
            <h3>Aperçu</h3>
            <div className="sidebar__content">
                <div className="sidebar__img">
                    <img src={bg_work} alt="Image" />
                </div>
                <div className="sidebar__content">
                    <div className="sidebar__header">
                        <h2>{ content.name }</h2>
                        {
                            content.categories ?
                                content.categories.map((item, index) => {
                                        return(
                                            <Pastille key={index} text={item.name} className={item.name.toLowerCase()} />
                                        )
                                    }
                                )
                                :
                                <Pastille text={content.category.name} className={content.category.name.toLowerCase()} />

                        }
                    </div>
                    <span className={"title-subtitle"}>Compositeur : {content.composer.name}</span>
                    <span className={"title-subtitle"}>Date : { parseDate(content.createdAt) }</span>

                    <p>{content.description}</p>
                    <Button className={"red-full"} text={"Voir plus"} link={ `#/oeuvre/${content.id}` } click={clearSidebarContent} />
                </div>
            </div>
        </div>
    );
}

export default SidebarWork;