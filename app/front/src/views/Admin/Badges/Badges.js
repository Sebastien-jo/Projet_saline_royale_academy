import React, {useState, useEffect} from "react";
import Button from "../../../components/button/button";
import icon_add from "../../../assets/icones/icon-add-White.svg";
import ListBadges from "../../../components/list/listBadges";
import "../../../styles/components/badge.css";
import useBadges from "../../../hooks/api/useBadges";

const Badges = () => {

    const [badges, setBadges] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [id, setId] = useState({}); // [1
    const {loading, error, handleDelete, handleGetAll, handleDeleteBadgeImage} = useBadges();

    const handleRemove = () => {
        console.log(id);
        handleDeleteBadgeImage(id.imageId).then((response) => {
            handleDelete(id.badgeId).then((response) => {
                setRefresh(!refresh)
            }).catch((err) => {
                console.log(err);
            });
        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        handleGetAll().then((response) => {
            console.log(response);
            setBadges(response);
        }).catch((err) => {
            console.log(err);
        });
    }, [refresh]);


    return (
        <div className="main-container">
            <div className="main-content">
                <Button text="Ajouter un badge" link={"#/badges/add"} className={"red-full"} isIcon={true} icon={icon_add} />
                <ListBadges text={"Liste des badges"} badges={badges} handleRemove={handleRemove} setId={setId} />
            </div>
        </div>
    );

}

export default Badges;