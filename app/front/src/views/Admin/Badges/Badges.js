import React, {useState, useEffect} from "react";
import Button from "../../../components/button/button";
import icon_add from "../../../assets/icones/icon-add-White.svg";
import ListBadges from "../../../components/list/listBadges";
import useBagdes from "../../../hooks/api/useBadges";

const Badges = () => {

    const [badges, setBadges] = useState([]);
    const {loading, error, handleGetAll} = useBagdes();

    useEffect(() => {
        handleGetAll().then((response) => {
            console.log(response);
            setBadges(response);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        <div className="main-container">
            <div className="main-content">
                <Button text="Ajouter un badge" link={"#/badges/add"} className={"red-full"} isIcon={true} icon={icon_add} />
                <ListBadges text={"Liste des badges"} badges={badges} />
            </div>
        </div>
    );

}

export default Badges;