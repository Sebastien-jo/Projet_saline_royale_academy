import React, {useState, useEffect} from 'react';
import Button from "../../../components/button/button";
import ListUsers from "../../../components/list/listUsers";
import {getUsers} from "../../../api/endpoints/user";
import icon_add from "../../../assets/icones/icon-add-White.svg";
import '../../../styles/users.css'

const Users = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        try {
            getUsers().then((response) => {
                setUsers(response['hydra:member']);
            }).catch((error) => {
                console.log(error);
            });
        }
        catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <div className="main-container">
            <div className="main-content">
                <Button text="Ajouter un utilisateur" link={"#/users/add"} className={"red-full"} isIcon={true} icon={icon_add} />

                <ListUsers text="Gérer les utilisateurs" users={users} />
            </div>
        </div>
    );
}

export default Users;