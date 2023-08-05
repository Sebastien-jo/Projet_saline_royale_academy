import React from 'react';
import logo_user from "../../assets/logo/logo_user.png";

const CardForumAnswer = ({message}) => {

    return (
        <div className={"card_sidebar_answer"}>
            <div className={"card-row_col"}>
                <div className={"card_avatar"}>
                    <img src={logo_user} alt={"avatar"} />

                </div>
                <div className={"card-row_container infos"}>
                    <p>{message.user.firstName} {message.user.lastName}</p>
                    <p>{ message.content }</p>
                    <p className={"subtitle"}>Publiée le { message.createdAt }</p>
                </div>
            </div>

            <div className={"card-row_container answer_action "}>
                <div className={"card_row_col"}>
                    <div className={"card-icon"}><span className={"icon answer"}></span>répondre</div>
                </div>
            </div>

            <div className={"line"}></div>

            <div className={"card_answer"}>
                {
                    message.childMessages.length > 0 ? message.childMessages.map((message) => {
                        return (
                            <div className={"card-row_col"}>
                                <div className={"card_avatar"}>
                                    <img src={"https://picsum.photos/200/300"} alt={"avatar"} />

                                </div>
                                <div className={"card-row_container infos"}>
                                    <p>{message.user.firstName} {message.user.lastName}</p>
                                    <p>{ message.content }</p>
                                    <p className={"subtitle"}>Publiée le { message.createdAt }</p>
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