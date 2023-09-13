import React, {useState, useEffect} from "react";
import Button from "../../../components/button/button";
import icon_add from "../../../assets/icones/icon-add-White.svg";
import ListBadges from "../../../components/list/listBadges";
import "../../../styles/components/badge.css";
import useBadges from "../../../hooks/api/useBadges";
import {useTranslation} from "react-i18next";

const Badges = () => {

    const [badges, setBadges] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [id, setId] = useState({}); // [1
    const {loading, error, handleDelete, handleGetAll, handleDeleteBadgeImage} = useBadges();

    const { i18n, t } = useTranslation();

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
            setBadges(response.reverse());
            console.log(response);
        }).catch((err) => {
            console.log(err);
        });
    }, [refresh]);




    return (
        <div className="main-container">
            <div className="main-content">
                <Button text={ t('bouton.add_badge') } link={"#/badges/add"} className={"red-full"} isIcon={true} icon={icon_add} />
                <ListBadges text={ t('list.badges') } badges={badges.length > 0 ? badges : false } handleRemove={handleRemove} setId={setId} />
            </div>
        </div>
    );

}

export default Badges;