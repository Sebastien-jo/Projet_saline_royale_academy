import React, {useEffect, useState} from "react";
import MenuBar from "../../../components/navbar/MenuBar";
import Input from "../../../components/form/input";
import useBadges from "../../../hooks/api/useBadges";
import Badge from "../../../components/badge/badge";
import Button from "../../../components/button/button";
import edit from "../../../assets/icones/icon-edit-White-stroke.svg";
import "../../../styles/account.css";
import logo_user from "../../../assets/logo/logo_user.png";
import {useSelector, useDispatch} from "react-redux";
import PopupAvatar from "../../../components/popup/popupAvatar";
import PopupDelete from "../../../components/popup/popupDelete";
import useUsers from "../../../hooks/api/useUsers";
import {changeAvatar, changeUser} from "../../../store/Slice/authSlice";
import SubmitBtn from "../../../components/form/submitBtn";

const Informations = () => {

    const [badges, setBadges] = useState([]);
    const [user, setUser] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    const [openPopupDelete, setOpenPopupDelete] = useState(false);
    const {loading, error, handleGetAll} = useBadges();
    const { handleDeleteUserImage, handleUpdate, handleGet } = useUsers();

    const userRedux = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("")
    const [plainPassword, setPlainPassword] = useState("");


    useEffect(() => {
        handleGetAll().then((response) => {
            console.log(response);
            setBadges(response);
        }).catch((err) => {
            console.log(err);
        });

        setUser(userRedux);
    }, []);


    const handlePatchUser = (e) => {

        e.preventDefault();
        const formData = new FormData();
        firstname !== "" ? formData.append("firstName", firstname) : null;
        lastname !== "" ? formData.append("lastName", lastname) : null;
        email !== "" ? formData.append("email", email) : null;
        plainPassword !== "" ? formData.append("plainPassword", plainPassword) : null;

        handleUpdate(user.id, formData).then((response) => {
            handleGet(user.id).then((response) => {
                console.log(response);
                setUser(response);
                dispatch(changeUser(response));
            }).catch((err) => {
                console.log(err);
            });
        }).catch((err) => {
            console.log(err);
        });
    }

    const deleteAvatar = () => {
        handleDeleteUserImage(user.avatar.id).then((response) => {
            console.log(response);
            setOpenPopupDelete(false);
            dispatch(changeAvatar(null));
        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        setUser(userRedux);
        setFirstname(userRedux.firstname);
        setLastname(userRedux.lastname);
        setEmail(userRedux.username);
    }, [userRedux]);


    return (
        <div className="main-container">
            <div className="main-content isMenu">
                <MenuBar items={[
                    {
                        name: "Mes informations",
                        link: "/account"
                    },
                    {
                        name: "Ma progression",
                        link: "/account/progression"
                    },
                    {
                        name: "Mentions légales",
                        link: "/account/mentions-legales"
                    }]}/>


                <div className={"container-padding"}>
                    <div className={"column-container"}>
                        <h2 className={"title"}>Mes informations personnelles</h2>

                        <div className={"row-container"}>
                            <div className={"column-container form-avatar"}>
                                <img src={user.avatar ? user.avatar.contentUrl : logo_user } className={"avatar"}/>
                                <div className={"avatar-buttons"}>
                                    <Button text={"Supprimer"} type={"button"} className={"red-stroke"} click={() =>  setOpenPopupDelete(true)}/>
                                    <Button text={"Modifier"} type={"button"} className={"blue-full"} icon={edit} isIcon={true} click={() =>  setOpenPopup(true)}/>
                                </div>

                                <PopupDelete title={"Supprimer l'avatar"} text={"Êtes-vous sûr de vouloir supprimer votre avatar ?"} deleteFunc={deleteAvatar} openPopup={openPopupDelete} setOpen={setOpenPopupDelete} />
                                <PopupAvatar openPopup={openPopup} setOpen={setOpenPopup} isAvatar={ user.avatar && user.avatar !== ""  ? true : false} userId={user.id} avatarId={ user.avatar && user.avatar !== ""  ? user.avatar.id : ""}/>
                            </div>
                            <div className={"column-container"}>
                                <form name={"form"} onSubmit={handlePatchUser}>
                                    <div className={"row-container"}>
                                        <Input label={"Nom"} name={"lastName"} type={"text"} value={lastname} onChange={(e) => setLastname(e.target.value)}/>
                                        <Input label={"Prénom"} name={"firstName"} type={"text"} value={firstname} onChange={(e) => setFirstname(e.target.value)}/>
                                    </div>
                                    <div className={"row-container"}>
                                            <Input label={"Email"} name={"email"} type={"email"} value={email} onChange={(e) => setEmail(e.target.value)}/>
                                    </div>
                                    <div className={"row-container"}>
                                        <Input label={"Mot de passe"} name={"plainPassword"} type={"password"} value={plainPassword} onChange={(e) => setPlainPassword(e.target.value)}/>
                                    </div>
                                    <SubmitBtn text={"Enregistrer"} className={"blue-full"} />
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className={"badge-container"}>
                        <h2>Mes badges</h2>

                        <div className={"badge-list"}>
                            {
                                badges.map((item, index) => {
                                    return (
                                        <Badge key={index} name={item.category} image={item.badgeImage.contentUrl} />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Informations;
