import React, {useEffect, useState} from 'react';
import FiltersModal from "../filters/filtersModal";
import Button from "../button/button";
import edit from "../../assets/icones/icon-edit-Blue-stroke.svg";
import trash from "../../assets/icones/icon-trash-White.svg";
import PopupDelete from "../popup/popupDelete";
import useUsers from "../../hooks/api/useUsers";
import logo_user from "../../assets/logo/logo_user.png";
import SortModal from "../filters/sortModal";

const ListUsers= ({text, users, setId, handleRemove}) => {

    const [openPopup, setOpen] = useState(false);
    const [sortedList, setSortedList] = useState([]);

    useEffect(() => {
        setSortedList(users);
    }, [users]);

    return (
        <div className="container-list">
            <div className="list-row">
                <div className="container__header">
                    <h2>{ text }</h2>
                    <SortModal list={sortedList} setSortedList={setSortedList} />
                </div>

                <div className="container-list__content">

                    {
                        users.map((user, index) => {
                            return(
                                <div className={"card-column"} key={index}>
                                    <div className={"card_avatar"}>
                                        {
                                            user.userAvatar ?
                                                <img src={user.userAvatar.contentUrl} alt={"avatar"} />
                                                :
                                                <img src={logo_user} alt={"avatar"} />
                                        }

                                    </div>
                                    <div>
                                        <p className={"card-column__title"}>{user.firstName}</p>
                                        <p className={"card-column__subtitle"}>{user.lastName}</p>
                                    </div>
                                      <p className={"card-column__text"}>{ user.email }</p>
                                    <p className={"card-column__text"}>{ user.roles[0]}</p>
                                    <div className={"card-column__buttons"}>
                                        <Button text="Modifier" link={`#/users/edit/${user.id}`} className={"blue-stroke"} isIcon={true} icon={edit} />
                                        <Button text="Supprimer"
                                                click={() => {
                                                    setOpen(true);
                                                    //setId({badgeId: badge.id, imageId: badge.badgeImage ? badge.badgeImage.id : null})
                                                    setId({userId: user.id, imageId: user.image ? user.image.id : null})
                                                }}
                                                className={"red-full"}
                                                isIcon={true}
                                                icon={trash} />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <PopupDelete deleteFunc={handleRemove} openPopup={openPopup} setOpen={setOpen} title={"Supprimer un utilisateur"} text={"Êtes-vous sûr de vouloir supprimer cet utilisateur ?"} />
            </div>
        </div>
    );
}

export default ListUsers;