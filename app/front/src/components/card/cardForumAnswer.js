import React from 'react';

const CardForumAnswer = ({message}) => {
    return (
        <div className={"card_sidebar_answer"}>
            <div className={"card-row_col"}>
                <div className={"card_avatar"}>
                    <img src={"https://picsum.photos/200/300"} alt={"avatar"} />

                </div>
                <div className={"card-row_container infos"}>
                    <p>{message.user.firstName} {message.user.lastName}</p>
                    <p>{ message.content }</p>
                </div>
            </div>

            <div className={"line"}></div>

            <div className={"card-row_container answer_action "}>
                <div className={"card_row_col"}>
                    <p className={"subtitle"}>Publiée le {message.createdAt}</p>
                    <div className={"card-icon"}><span className={"icon answer"}></span>répondre</div>
                </div>
            </div>
        </div>
    );
}

export default CardForumAnswer;