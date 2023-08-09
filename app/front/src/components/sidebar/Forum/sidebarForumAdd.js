import React, {useEffect, useState} from 'react';
import Button from "../../button/button";
import Textarea from "../../form/textarea";
import useForum from "../../../hooks/api/useForum";
import Input from "../../form/input";
import {useSelector} from "react-redux";


const SidebarForumAdd = () => {


    const {loading, error, handlePost} = useForum();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        handlePost({
            title: title,
            description: description
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className="sidebar isForum">
            <div className="sidebar__header">
                <h2>Poser votre question :</h2>
            </div>
            <div className="sidebar__content">

                <div className={"card_sidebar"}>
                    <form onSubmit={handleSubmit} method="POST">
                        <div className={"card-row_container infos"}>
                            <Input type="text" name="title" label="Votre question" onChange={e => setTitle(e.target.value)} value={title}/>
                            <Textarea name={"description"} label="Un peu de détails ?" onChange={e => setDescription(e.target.value)} value={description}/>
                            <input type={"submit"} value={"Envoyer"} className={"btn blue-full"}/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SidebarForumAdd;