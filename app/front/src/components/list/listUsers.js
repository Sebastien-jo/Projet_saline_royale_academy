import React, {useState} from 'react';
import FiltersCard from "../filters/filtersCard";
import Button from "../button/button";
import edit from "../../assets/icones/icon-edit-Blue-stroke.svg";
import trash from "../../assets/icones/icon-trash-White.svg";
import PopupDelete from "../popup/popupDelete";

const ListUsers= ({text, users}) => {

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
                        users.map((user, index) => {
                            return(
                                <div className={"card-column"} key={index}>
                                    <div className={"card_avatar"}>
                                        <img src={"https://picsum.photos/200/300"} alt={"avatar"} />
                                    </div>
                                    <div>
                                        <p className={"card-column__title"}>{user.firstName}</p>
                                        <p className={"card-column__subtitle"}>{user.lastName}</p>
                                    </div>
                                      <p className={"card-column__text"}>email</p>
                                    <p className={"card-column__text"}>Rôle</p>
                                    <div className={"card-column__buttons"}>
                                        <Button text="Modifier" link={`#/users/edit/${user.id}`} className={"blue-stroke"} isIcon={true} icon={edit} />
                                        <Button text="Supprimer" click={() => setOpen(true)} className={"red-full"} isIcon={true} icon={trash} />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <PopupDelete openPopup={openPopup} setOpen={setOpen} title={"Supprimer un utilisateur"} text={"Êtes-vous sûr de vouloir supprimer cet utilisateur ?"} />
            </div>
        </div>
    );
}

export default ListUsers;