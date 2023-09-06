import React, {useEffect, useState, useRef} from 'react';
import {useTranslation} from "react-i18next";
import Button from "../button/button";
import icon_cross from "../../assets/icones/icon-cross-Blue-full.svg";
import icon_delete from "../../assets/icones/icon-trash-White.svg";
import InputFile from "../form/inputFile";
import SubmitBtn from "../form/submitBtn";
import useUsers from "../../hooks/api/useUsers";
import {useChangeAvatar} from "../../hooks/useChangeAvatar";


const PopupAvatar = ({openPopup = false, setOpen, isAvatar, userId, avatarId = false}) => {

    const [isOpened, setIsOpened] = useState(openPopup);
    const { i18n, t } = useTranslation();

    const fileInputRef = useRef(null); // Ref to the file input element
    const [file, setFile] = useState(); // State to store the selected file

    const {loading, error, handleAddUserImage, handleDeleteUserImage} = useUsers();
    const {handleAvatar} = useChangeAvatar();

    const handleLinkClick = () => {
        setIsOpened(false);
        setOpen(false);
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Access the file object and update the state
        console.log(isAvatar, avatarId, userId);
    }

    const handleSubmit = (e) => {

        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file); // Append the selected file to the FormData
        formData.append("userId", userId); // Append the selected file to the FormData

        isAvatar ?
            handleDeleteUserImage(avatarId).then((response) => {
                console.log("delete");
                handleAddUserImage(formData).then((response) => {
                    handleAvatar(userId);
                    setOpen(false);
                }).catch((err) => {
                    console.log(err);
                });
            }
        ).catch((err) => {
            console.log(err);
        })
        : handleAddUserImage(formData).then((response) => {
                handleAvatar(userId);
                setOpen(false);
            }
        ).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        setIsOpened(openPopup);
    }, [openPopup]);



    return(
        <div className={`popup-container small ${isOpened ? "open" : "close"}`}>
            <div className="popup-content">
                <div className="popup-close" onClick={() => handleLinkClick()}></div>
                <div className="popup-header">
                    <h1 className="popup-title">{isAvatar ? "Modifier" : "Ajouter"} votre photo de profil</h1>
                </div>

                <div className="popup-body">
                    <form method={"post"} onSubmit={handleSubmit}>
                        <InputFile useRef={fileInputRef} name={"avatar"} label={"Avatar"} onChange={handleFileChange} accept="image/*" />

                        <div className="popup-body-row">
                            <Button text={"Annuler"} className={"blue-stroke"} isIcon={true} icon={icon_cross} click={() => setOpen(false)} />
                            <SubmitBtn text={isAvatar ? "Modifier" : "Ajouter"} className={"blue-full"}/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default PopupAvatar;