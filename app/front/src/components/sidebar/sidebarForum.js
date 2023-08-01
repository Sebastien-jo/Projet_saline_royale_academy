import React, {useEffect, useState} from 'react';
import CardForum from "../card/cardForum";
import Pastille from "../pastille/pastille";
import Button from "../button/button";
import icon from "../../assets/icones/icon-edit-Blue-stroke.svg";
import Textarea from "../form/textarea";
import CardForumAnswer from "../card/cardForumAnswer";
import useForum from "../../hooks/useForum";
import useForumMessage from "../../hooks/useForumMessage";


const SidebarForum = (forumId) => {

    const [isLike, setIsLike] = useState(false);
    const {loading, error, handleGet} = useForum();
    const {loadingMessage, errorMessage, handleGetMessage} = useForumMessage();
    const [forum, setForum] = useState([]);
    const [forumMessage, setForumMessage] = useState([]);

    const handleLike = () => {
        setIsLike(!isLike);
    }

    useEffect(() => {
        handleGet(80).then((response) => {
            console.log(response);
            setForum(response);
        }).catch((err) => {
            console.log(err);
        });

        handleGetMessage(80).then((response) => {
            console.log(response);
            setForumMessage(response);
        }).catch((err) => {
            console.log(err);
        });
    },[forumId])

    return (
        <div className="sidebar isForum">
            <div className="sidebar__header">
                <h2>{ forum.title }</h2>
                <Pastille text={"Actif"} color={"green"} />
            </div>
            <div className="sidebar__content">

                <div className={"card_sidebar"}>
                    <div className={"card-row_container infos"}>
                        <p>{ forum.description}</p>
                         <p className={"subtitle"}>Publiée le 05/06/2023</p>
                    </div>

                    <div className={"line"}></div>

                    <div className={"card-row_container answer_action"}>

                        <div className={"card_crow_col"}>
                            <div className={"card_avatar"}>
                                <img src={"https://picsum.photos/200/300"} alt={"avatar"} />
                                <p>nom user</p>
                            </div>

                            <Button className={"blue-stroke"} isIcon={true} icon={icon} text={"Répondre"} />
                        </div>
                    </div>
                </div>


            </div>

            <div className="card-forum-answer form">
                <h2>Répondre à la question de userName</h2>
                <form className={"form_forum"}>
                    <Textarea name={"answer"} />
                    <Button className={"blue-full"} text={"Ajouter"} isArrow={true} type={"submit"} />
                </form>
            </div>

            <div className="card-forum-answer">
                <h2>Réponses <p>{ forumMessage.length } réponses</p></h2>
                {
                    forumMessage.map((message) => {
                        return <CardForumAnswer key={message.id} message={message} />
                    })
                }

            </div>
        </div>
    );
}

export default SidebarForum;