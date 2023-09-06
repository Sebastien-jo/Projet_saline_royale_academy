import React, {useState, useEffect} from 'react';
import Button from "../../../components/button/button";
import ListUsers from "../../../components/list/listUsers";
import icon_add from "../../../assets/icones/icon-add-White.svg";
import '../../../styles/users.css'
import useUsers from "../../../hooks/api/useUsers";


const Users = () => {

    const [id, setId] = useState(null);
    const [users, setUsers] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const {loading, error, handleDelete, handleGetAll, handleDeleteUserImage} = useUsers();

    const handleRemove = () => {
        console.log(id);
        id.imageId !== null ?
            handleDeleteUserImage(id.imageId).then((response) => {
                handleDelete(id.userId).then((response) => {
                    setRefresh(!refresh);
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            })
        :
            handleDelete(id.userId).then((response) => {
                setRefresh(!refresh);
            }).catch((err) => {
                console.log(err);
            });

    }

    useEffect(() => {
        handleGetAll().then((response) => {
            setUsers(response.reverse());
        }).catch((err) => {
            console.log(err);
        });
    }, [refresh]);

    return (
        <div className="main-container">
            <div className="main-content">
                <Button text="Ajouter un utilisateur" link={"#/users/add"} className={"red-full"} isIcon={true} icon={icon_add} />

                <ListUsers text="Gérer les utilisateurs" users={users} setId={setId} handleRemove={handleRemove} />
            </div>
        </div>
    );
}

export default Users;