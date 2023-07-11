import React, {useState} from 'react';
import FiltersCard from "../filters/filtersCard";
import Button from "../button/button";
import edit from "../../assets/icones/icon-edit-blue-stroke.svg";
import trash from "../../assets/icones/icon-trash-White.svg";
import PopupDelete from "../popup/popupDelete";
import '../../styles/components/badge.css';

const ListBadges= ({text, badges}) => {

    const [openPopup, setOpen] = useState(false);



    return (
        <div className="container-list">
            <div className="list-row">
                <div className="container__header">
                    <h2>{ text }</h2>
                    <FiltersCard/>
                </div>

                <div className="container-list__content">

                    {
                        badges.map((badge, index) => {
                            return(
                                <div className={"card-column"} key={index}>
                                    <div className={"card_avatar"}>
                                        <img src={badge.imagePath} alt={"avatar"} />
                                    </div>
                                    <div>
                                        <p className={"card-column__title"}>{badge.name}</p>
                                    </div>
                                    <p className={"card-column__text"}>{badge.description}</p>
                                    <p className={"card-column__text"}>{badge.category}</p>
                                    <div className={"card-column__buttons"}>
                                        <Button text="Modifier" link={"/badge/update"} className={"blue-stroke"} isIcon={true} icon={edit} />
                                        <Button text="Supprimer" click={() => setOpen(true)} className={"red-full"} isIcon={true} icon={trash} />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <PopupDelete openPopup={openPopup} setOpen={setOpen} title={"Supprimer un badge"} text={"Êtes-vous sûr de vouloir supprimer ce badge ?"} />
            </div>
        </div>
    );
}

export default ListBadges;