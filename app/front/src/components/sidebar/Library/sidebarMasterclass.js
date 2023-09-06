import React from "react";
import "../../../styles/components/sidebar.css";
import Pastille from "../../pastille/pastille";
import Button from "../../button/button";
import useSidebarContent from "../../../hooks/useSidebarContent";
import {useParseDate} from "../../../hooks/useParseDate";
import useMasterclassUser from "../../../hooks/api/useMasterclassUser";
import {useNavigate} from "react-router-dom";

const SidebarMasterclass = ({ content, clearSidebarContent }) => {
    const {parseDate} = useParseDate();

    const {handlePost} = useMasterclassUser();
    const navigate = useNavigate();

    const handleStart = () => {
        handlePost(content.id).then((response) => {
            console.log("check");
            clearSidebarContent();
            navigate(`/masterclass/${content.id}`);
        }).catch((err) => {
            console.log(err);
        });
    }


    return (
        <div className="sidebar">
            <h3>Aperçu</h3>
            <div className="sidebar__content">
                <div className="sidebar__img">
                    <img src="https://images.unsplash.com/photo-1452724931113-5ab6340ce080?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" alt="Image" />
                </div>
                <div className="sidebar__content">
                    <div className="sidebar__header">
                        <h2>{ content.name }</h2>
                        <Pastille text={content.work.category.name} className={content.work.category.name.toLowerCase()} />

                    </div>
                    <span className={"title-subtitle"}>Professeur : {content.teacher.firstName} {content.teacher.lastName}</span>
                    <span className={"title-subtitle"}>Date : { parseDate(content.createdAt) }</span>

                    <p>{content.description}</p>
                    {
                        content.started ?
                            <Button className={"red-full"} text={"Continuer"} link={`#/masterclass/${content.id}` } click={clearSidebarContent} />
                            :
                            <Button className={"red-full"} text={"Commencer"} link={`#/masterclass/${content.id}` } click={handleStart} />
                    }
                </div>
            </div>
        </div>
    )
}

export default SidebarMasterclass;