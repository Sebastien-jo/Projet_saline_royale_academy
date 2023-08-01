import React, {useState} from "react";
import Button from "../button/button";

import icon from "../../assets/icones/icon-edit-White-stroke.svg";
import Pastille from "../pastille/pastille";

const CardForum = ({forum}) => {

    const [isLike, setIsLike] = useState(false);
    const [isSelect, setIsSelect] = useState(false);

    const handleLike = () => {
        setIsLike(!isLike);
    }

    return(
        <div className={`card-row ${isSelect ? "selected" : ""}`}>
            <div className={"card-row_container infos"}>
                <div className={"card_avatar"}>
                    <img src={"https://picsum.photos/200/300"} alt={"avatar"} />
                    <p>nom user</p>
                </div>
                <div className={"card_content"}>
                    <div className={"card_content_header"}>
                        <h2>{forum.title}</h2>
                        {
                            forum.isClosed ? <Pastille text={"Fermé"} color={"red"} /> : <Pastille text={"Actif"} color={"green"} />
                        }

                    </div>
                    <p>{ forum.description }</p>
                    <p className={"subtitle"}>Publiée le 05/06/2023</p>
                </div>
            </div>

            <div className={"line"}></div>

            <div className={"card-row_container answer_action"}>
                <div className={"card_crow_col"}>
                    <div className={`card-icon`} onClick={handleLike}><span className={`icon like ${isLike ? "isLike" : ""}`}></span>{ forum.countLikes }</div>
                    <div className={"card-icon"}><span className={"icon answer"}></span>12 commentaire</div>
                </div>

                <div className={"card_crow_col"}>
                    <Button className={"blue-full"} text={"Afficher"} click={() => setIsSelect(!isSelect)} />
                </div>
            </div>
        </div>
    )
}

export default CardForum;