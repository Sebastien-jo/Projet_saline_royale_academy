import React, {useEffect, useState} from "react";
import Button from "../../button/button";
import useLikes from "../../../hooks/api/useLikes";
import Pastille from "../../pastille/pastille";
import logo_user from "../../../assets/logo/logo_user.png";
import {useParseDate} from "../../../hooks/useParseDate";

const CardForum = ({forum, setSidebar, handleSelect, isSelected, setActiveSidebar, refresh, setRefresh }) => {

    const [isLike, setIsLike] = useState(forum.isLiked);
    const {loading, error, handlePost} = useLikes();
    const {parseDate} = useParseDate();

    const handleLike = () => {
        !isLike ? setIsLike(true) : null;
    }

    const handleClick = () => {
        handleSelect();
        setSidebar(forum.id);
        setActiveSidebar("forum");
    }

    useEffect(() => {
        isLike ? handlePost(forum.id, {}).then((response) => {
            setRefresh(!refresh);
        }).catch((err) => {
            console.log(err);
        }) : null;
    },[isLike])


    return(
        <div className={`card-row ${isSelected ? "selected" : ""}`}>
            <div className={"card-row_container infos"}>
                <div className={"card_avatar"}>
                    <img src={forum.user && forum.user.userAvatar ? forum.user.userAvatar.contentUrl : logo_user} alt={"avatar"}/>
                    <p>{ forum.user ? forum.user.firstName +" "+ forum.user.lastName : "Anonyme"}</p>
                </div>
                <div className={"card_content"}>
                    <div className={"card_content_header"}>
                        <h2>{forum.title}</h2>
                        {
                            forum.isClosed ? <Pastille text={"Fermé"} className={"red"} /> : <Pastille text={"Actif"} className={"green"} />
                        }

                    </div>
                    <p>{ forum.description }</p>
                    <p className={"subtitle"}>Publiée le {parseDate(forum.createdAt)}</p>
                </div>
            </div>

            <div className={"line"}></div>

            <div className={"card-row_container answer_action"}>
                <div className={"card_row_col"}>
                    <div className={`card-icon`} onClick={handleLike}><span className={`icon like ${isLike ? "isLike" : ""}`}></span>{ forum.countLikes }</div>
                    <div className={"card-icon"} onClick={handleClick}><span className={"icon answer"}></span>{ forum.forumMessages.length} commentaire</div>
                </div>

                <div className={"card_row_col"}>
                    <Button className={"blue-full"} text={"Afficher"} click={handleClick} />
                </div>
            </div>
        </div>
    )
}

export default CardForum;