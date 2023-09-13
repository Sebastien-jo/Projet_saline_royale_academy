import React, {useEffect, useState} from 'react';
import {getCompositors} from "../../../api/endpoints/compositor";
import Button from "../../../components/button/button";
import icon_add from "../../../assets/icones/icon-add-White.svg";
import ListOeuvres from "../../../components/list/listOeuvres";
import useOeuvres from "../../../hooks/api/useOeuvres";
import {useTranslation} from "react-i18next";

const Oeuvres = () => {

    const [oeuvres, setOeuvres] = useState(false); // [state, function to update state
    const {loading, error, handleGetAll, handleDelete} = useOeuvres();
    const [refresh, setRefresh] = useState(false);
    const [id, setId] = useState(null);

    const { i18n, t } = useTranslation();

    useEffect(() => {
        handleGetAll().then((response) => {
            setOeuvres(response.reverse());
        }).catch((err) => {
            console.log(err);
        });
    }, [refresh]);

    const handleOeuvreDelete = () => {
        handleDelete(id).then((response) => {
            setRefresh(!refresh);
        }).catch((err) => {
            console.log(err);
        });

    }

    return (
        <div className="main-container">
            <div className="main-content">
                <Button text={ t('bouton.add_work') }  link={"#/oeuvres/add"} className={"red-full"} isIcon={true} icon={icon_add} />

                <ListOeuvres oeuvres={oeuvres ? oeuvres : false} error={error} isAdmin={true} deleteFunction={handleOeuvreDelete} setId={setId} />
            </div>
        </div>
    );

}

export default Oeuvres;