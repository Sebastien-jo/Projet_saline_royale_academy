import React, {useState} from "react";
import Button from "../button/button";

import icon from "../../assets/icones/icon-edit-White-stroke.svg";
import Pastille from "../pastille/pastille";

const CardForum = () => {

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
                        <h2>La question du monsieur</h2>
                        <Pastille text={"Actif"} color={"green"} />
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, accusantium adipisci alias asperiores atque autem blanditiis commodi consequatur cumque cupiditate delectus doloremque doloribus ducimus ea earum eligendi eos error est eum eveniet excepturi exercitationem facilis fugiat fugit hic id illum impedit in incidunt ipsa ipsum iure iusto labore laboriosam laborum libero magnam maiores maxime minima minus molestiae mollitia natus nemo neque nihil nisi nobis nostrum nulla numquam obcaecati officia officiis omnis optio pariatur perferendis perspiciatis placeat porro possimus praesentium provident quae quas quia quibusdam quisquam quod.</p>
                    <p className={"subtitle"}>Publiée le 05/06/2023</p>
                </div>
            </div>

            <div className={"line"}></div>

            <div className={"card-row_container answer_action"}>
                <div className={"card_crow_col"}>
                    <div className={`card-icon`} onClick={handleLike}><span className={`icon like ${isLike ? "isLike" : ""}`}></span>34</div>
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