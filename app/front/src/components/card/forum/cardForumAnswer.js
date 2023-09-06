import React, {useState} from 'react';
import logo_user from "../../../assets/logo/logo_user.png";
import CardMessageForm from "./cardMessageForm";
import Button from "../../button/button";
import icon from "../../../assets/icones/icon-edit-Blue-stroke.svg";
import {useParseDate} from "../../../hooks/useParseDate";
import ButtonIcon from "../../button/buttonIcon";

const CardForumAnswer = ({message, forumId, setMessageAnswer, forumClosed}) => {

    const [isOpened, setIsOpened] = useState(false);
    const {parseDate} = useParseDate();

    return (
        <div className={"card_sidebar_answer"}>
            <div className={"card-row_col"}>
                <div className={"card_avatar"}>
                    <img src={message.user && message.user.userAvatar ? message.user.userAvatar.contentUrl : logo_user} alt={"avatar"} />

                </div>
                <div className={"card-row_container infos"}>
                    <p>{message.user.firstName} {message.user.lastName}</p>
                    <p>{ message.content }</p>
                    <p className={"subtitle"}>Publiée le { parseDate(message.createdAt) }</p>
                </div>

                { !forumClosed ?
                    <div className={ "card_row_col" }>
                        <ButtonIcon icon={icon} click={() => setIsOpened(!isOpened)} className={"blue-stroke"}/>
                    </div>
                    : null
                }
            </div>



            {
                isOpened ? <CardMessageForm forumId={forumId} messageId={message.id} setMessageAnswer={setMessageAnswer}/> : null
            }

            <div className={"card_answer"}>
                {
                    message.childMessages.length > 0 ? message.childMessages.map((message) => {
                        return (
                            <div className={"card-row_col"}>
                                <div className={"card_avatar"}>
                                    <img src={message.user && message.user.userAvatar ? message.user.userAvatar.contentUrl : logo_user} alt={"avatar"} />

                                </div>
                                <div className={"card-row_container infos"}>
                                    <p>{message.user.firstName} {message.user.lastName}</p>
                                    <p>{ message.content }</p>
                                    <p className={"subtitle"}>Publiée le { parseDate(message.createdAt) }</p>
                                </div>
                            </div>
                        )
                    }).reverse() : null
                }
            </div>
        </div>
    );
}

export default CardForumAnswer;