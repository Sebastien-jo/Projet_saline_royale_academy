import React, {useEffect, useState} from 'react';
import Pastille from "../../pastille/pastille";
import Button from "../../button/button";
import icon from "../../../assets/icones/icon-edit-Blue-stroke.svg";
import CardForumAnswer from "../../card/forum/cardForumAnswer";
import useForum from "../../../hooks/api/useForum";
import useForumMessage from "../../../hooks/api/useForumMessage";
import CardForumForm from "../../card/forum/cardForumForm";
import logo_user from "../../../assets/logo/logo_user.png";
import Loader from "../../loader/loader";
import {useParseDate} from "../../../hooks/useParseDate";
import ButtonIcon from "../../button/buttonIcon";
import close from "../../../assets/icones/icon-cross-White-stroke.svg";


const SidebarForum = ({isSideBar, closeSidebar}) => {

    const [isLike, setIsLike] = useState(false);
    const {loading, error, handleGet} = useForum();
    const {loadingMessage, errorMessage, handleGetMessage} = useForumMessage();
    const [forum, setForum] = useState([]);
    const [forumMessage, setForumMessage] = useState([]);
    const [newMessage, setNewMessage] = useState(false);
    const [isOpened, setIsOpened] = useState(false);
    const [newMessageAnswer, setMessageAnswer] = useState(false);
    const {parseDate} = useParseDate();

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
                setMessageAnswer(false);
                setForumMessage(response);
            }).catch((err) => {
                console.log(err);
            });
        }
    },[isSideBar, newMessage, newMessageAnswer])

    console.log(forumMessage);

    return forum !== [] ? (
        <div className="sidebar isForum">
            <div className={'sidebar_fixed'}>
                <div className="sidebar__header">
                    <ButtonIcon className={"blue"} click={closeSidebar} icon={close} text={"Fermer"} />
                    {
                        forum.isClosed ? <Pastille text={"Fermé"} className={"red"} /> : <Pastille text={"Actif"} className={"green"} />
                    }
                </div>

                <div className="sidebar__header">
                    <h2>{ forum.title }</h2>
                </div>
                <div className="sidebar__content">

                    <div className={"card_sidebar"}>
                        <div className={"card-row_container infos"}>
                            <p>{ forum.description}</p>
                             <p className={"subtitle"}>Publiée le {parseDate(forum.createdAt)}</p>
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

                                {!forum.isClosed ? <Button className={"blue-stroke"} isIcon={true} icon={icon} text={"Répondre"} click={() => setIsOpened(!isOpened)} /> : null}
                            </div>
                        </div>
                    </div>
                </div>

                {
                    isOpened ?  <CardForumForm forumId={forum.id} setNewMessage={setNewMessage} setIsOpened={setIsOpened} name={forum.user ? forum.user.firstName : "Anonyme"} /> : null
                }

                <div className="card-forum-answer">
                    <h2>Réponses <p>{ forumMessage.length } réponses</p></h2>
                    {
                        forumMessage.length > 0 ? forumMessage.map((message, index) => {
                            return <CardForumAnswer key={index} message={message} forumId={forum.id} setMessageAnswer={setMessageAnswer} forumClosed={forum.isClosed }/>
                        }).reverse()
                            :
                            <p>Il n'y a pas encore de réponse à ce message</p>

                    }
                </div>
            </div>
        </div>
    )
        :
        <Loader />
}

export default SidebarForum;