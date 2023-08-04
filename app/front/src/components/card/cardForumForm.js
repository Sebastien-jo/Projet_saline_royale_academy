import React,{ useState} from 'react';
import Textarea from "../form/textarea";
import Button from "../button/button";
import useForumMessage from "../../hooks/useForumMessage";

const CardForumForm = ({forumId,  setNewMessage}) => {

    const {loadingMessage, errorMessage, handlePostMessage} = useForumMessage();
    const [content, setContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        handlePostMessage({forum: `api/forums/${forumId}`, content: content})
        .then((response) => {
            setNewMessage(true);
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
                <input type={"submit"} value={"Envoyer"} className={"btn blue-full"}/>
            </form>
        </div>
    );

}

export default CardForumForm;