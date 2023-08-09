import React, {useState, useEffect} from 'react';
import Button from "../../../components/button/button";
import ListUsers from "../../../components/list/listUsers";
import icon_add from "../../../assets/icones/icon-add-White.svg";
import '../../../styles/users.css'
import useUsers from "../../../hooks/api/useUsers";

const Users = () => {

    return (
        <div className="main-container">
            <div className="main-content">
                <Button text="Ajouter un utilisateur" link={"#/users/add"} className={"red-full"} isIcon={true} icon={icon_add} />

                <ListUsers text="Gérer les utilisateurs"/>
            </div>
        </div>
    );
}

export default Users;