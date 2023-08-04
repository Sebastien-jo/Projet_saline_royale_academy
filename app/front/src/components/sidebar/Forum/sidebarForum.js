import React, {useEffect, useState} from 'react';
import CardForum from "../../card/cardForum";
import Pastille from "../../pastille/pastille";
import Button from "../../button/button";
import icon from "../../../assets/icones/icon-edit-Blue-stroke.svg";
import Textarea from "../../form/textarea";
import CardForumAnswer from "../../card/cardForumAnswer";
import useForum from "../../../hooks/useForum";
import useForumMessage from "../../../hooks/useForumMessage";
import CardForumForm from "../../card/cardForumForm";
import logo_user from "../../../assets/logo/logo_user.png";


const SidebarForum = ({isSideBar}) => {

    const [isLike, setIsLike] = useState(false);
    const {loading, error, handleGet} = useForum();
    const {loadingMessage, errorMessage, handleGetMessage} = useForumMessage();
    const [forum, setForum] = useState([]);
    const [forumMessage, setForumMessage] = useState([]);
    const [newMessage, setNewMessage] = useState(false);

    const handleLike = () => {
        setIsLike(!isLike);
    }

    useEffect(() => {
        if(isSideBar){
            setNewMessage(false);
            handleGet(isSideBar).then((response) => {
                setForum(response);
            }).catch((err) => {
                console.log(err);
            });

            handleGetMessage(isSideBar).then((response) => {
                setForumMessage(response);
            }).catch((err) => {
                console.log(err);
            });
        }
    },[isSideBar, newMessage])

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
                                <img src={logo_user} alt={"avatar"} />
                                {
                                    forum.user ? <p>{ forum.user.firstName } { forum.user.lastName }</p> : <p>Anonyme</p>
                                }
                            </div>

                            <Button className={"blue-stroke"} isIcon={true} icon={icon} text={"Répondre"} />
                        </div>
                    </div>
                </div>
            </div>

            <CardForumForm forumId={forum.id} setNewMessage={setNewMessage} />

            <div className="card-forum-answer">
                <h2>Réponses <p>{ forumMessage.length } réponses</p></h2>
                {
                    forumMessage.length > 0 ? forumMessage.map((message, index) => {
                        return <CardForumAnswer key={index} message={message} />
                    }).reverse()
                        :
                        <p>Il n'y a pas de réponse à ce message</p>

                }

            </div>


        </div>
    );
}

export default SidebarForum;