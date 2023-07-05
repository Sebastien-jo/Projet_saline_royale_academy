import React, {useState} from 'react';
import CardForum from "../card/cardForum";
import Pastille from "../pastille/pastille";
import Button from "../button/button";
import icon from "../../assets/icones/icon-edit-Blue-stroke.svg";
import Textarea from "../form/textarea";

const SidebarForum = () => {

    const [isLike, setIsLike] = useState(false);

    const handleLike = () => {
        setIsLike(!isLike);
    }

    return (
        <div className="sidebar isForum">
            <div className="sidebar__header">
                <h2>La question du monsieur</h2>
                <Pastille text={"Actif"} color={"green"} />
            </div>
            <div className="sidebar__content">

                <div className={"card_sidebar"}>
                    <div className={"card-row_container infos"}>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, accusantium adipisci alias asperiores atque autem blanditiis commodi consequatur cumque cupiditate delectus doloremque doloribus ducimus ea earum eligendi eos error est eum eveniet excepturi exercitationem facilis fugiat fugit hic id illum impedit in incidunt ipsa ipsum iure iusto labore laboriosam laborum libero magnam maiores maxime minima minus molestiae mollitia natus nemo neque nihil nisi nobis nostrum nulla numquam obcaecati officia officiis omnis optio pariatur perferendis perspiciatis placeat porro possimus praesentium provident quae quas quia quibusdam quisquam quod.</p>
                        <p className={"subtitle"}>Publiée le 05/06/2023</p>
                    </div>

                    <div className={"line"}></div>

                    <div className={"card-row_container answer_action"}>

                        <div className={"card_crow_col"}>
                            <div className={"card_avatar"}>
                                <img src={"https://picsum.photos/200/300"} alt={"avatar"} />
                                <p>nom user</p>
                            </div>

                            <Button className={"blue-stroke"} isIcon={true} icon={icon} text={"Répondre"} />
                        </div>
                    </div>
                </div>


            </div>

            <div className="card-forum-answer form">
                <h2>Répondre à la question de userName</h2>
                <form className={"form_forum"}>
                    <Textarea name={"answer"} />
                    <Button className={"blue-full"} text={"Ajouter"} isArrow={true} type={"submit"} />
                </form>
            </div>

            <div className="card-forum-answer">
                <h2>Réponses <p>12 réponses</p></h2>


            </div>
        </div>
    );
}

export default SidebarForum;