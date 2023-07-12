import React, {useState, useEffect} from "react";
import Button from "../../../components/button/button";
import icon_add from "../../../assets/icones/icon-add-White.svg";
import {getBadges} from "../../../api/endpoints/badge";
import ListBadges from "../../../components/list/listBadges";

const Badges = () => {

    const [badges, setBadges] = useState([]);

    useEffect(() => {
        getBadges().then((res) => {
            setBadges(res['hydra:member']);
            console.log(res['hydra:member']);
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