import React from "react";
import "../../../styles/components/sidebar.css";
import Pastille from "../../pastille/pastille";
import Button from "../../button/button";
import {useParseDate} from "../../../hooks/useParseDate";

const SidebarComposer = ({ content, clearSidebarContent }) => {

    const {parseDate} = useParseDate();

    return (
        <div className="sidebar">
            <h3>Aperçu</h3>
            <div className="sidebar__content">
                <div className="sidebar__img">
                    <img src={content.picture} alt="Image" />
                </div>
                <div className="sidebar__content">
                    <div className={"sidebar__header"}>
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
                    <div className="sidebar__header">
                        <h2>{ content.name }</h2>
                    </div>
                    <span className={"title-subtitle"}>Compositeur : {content.completeName}</span>
                    <span className={"title-subtitle"}>Naissance : { parseDate(content.birth) }</span>
                    { content.death ? <span className={"title-subtitle"}>Décès : { parseDate(content.death) }</span> : null }
                    <span className={"title-subtitle"}>Nationalité: {content.nationality}</span>

                    <p>{content.description}</p>
                    <Button className={"red-full"} text={"Voir plus"} link={ `#/compositeur/${content.id}` } click={clearSidebarContent} />
                </div>
            </div>
        </div>
    );
}

export default SidebarComposer;