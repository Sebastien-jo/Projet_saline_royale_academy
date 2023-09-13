import React,{ useState} from 'react';
import Textarea from "../../form/textarea";
import Button from "../../button/button";
import useForumMessage from "../../../hooks/api/useForumMessage";
import SubmitBtn from "../../form/submitBtn";
import '../../../styles/components/popup.css';
import {useTranslation} from "react-i18next";

const CardForumForm = ({forumId,  setNewMessage, setIsOpened, name}) => {

    const {loadingMessage, errorMessage, handlePostMessage} = useForumMessage();
    const [content, setContent] = useState("");

    const { i18n, t } = useTranslation();

    const handleSubmit = (e) => {
        e.preventDefault();
        handlePostMessage({forum: `api/forums/${forumId}`, content: content})
        .then((response) => {
            setNewMessage(true);
            setContent("");
            setIsOpened(false);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className="popup-container-relative">
            <div className="popup-container card-forum-answer form">

                <div className="popup-content">
                    <div className="popup-close" onClick={() => setIsOpened(false)}></div>
                    <div className="popup-header">
                        <h2>{ t('forum.form.answer_at') } {name}</h2>
                    </div>
                    <form className={"form_forum popup-body"} onSubmit={handleSubmit}>
                        <Textarea name={"content"} label={ t('bouton.answer_at') }  onChange={e => setContent(e.target.value)} value={content} />
                        <SubmitBtn label={ t('bouton.answer') } className={"blue-full"} loading={loadingMessage} text={ t('bouton.send') } />
                    </form>
                </div>

            </div>
        </div>
    );

}

export default CardForumForm;