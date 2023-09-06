import React,{ useState} from 'react';
import Textarea from "../../form/textarea";
import Button from "../../button/button";
import useForumMessage from "../../../hooks/api/useForumMessage";
import SubmitBtn from "../../form/submitBtn";

const CardMessageForm = ({messageId, forumId, setMessageAnswer}) => {

    const {loadingMessage, errorMessage, handlePostMessage} = useForumMessage();
    const [content, setContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        handlePostMessage({forum: `api/forums/${forumId}`, parent: `api/forum_messages/${messageId}`, content: content})
            .then((response) => {
                setMessageAnswer(true);
                setContent("");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className="card-forum-answer form">
            <h2>Répondre à nom</h2>
            <form className={"form_forum"} onSubmit={handleSubmit}>
                <Textarea name={"content"} label={"Votre réponse"} onChange={e => setContent(e.target.value)} value={content} />
                <SubmitBtn text={"Envoyer"} className={"blue-full"}/>
            </form>
        </div>
    );

}

export default CardMessageForm;