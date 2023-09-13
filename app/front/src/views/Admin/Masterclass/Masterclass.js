import React, {useEffect, useState} from 'react';
import Button from "../../../components/button/button";
import icon_add from "../../../assets/icones/icon-add-White.svg";
import ListMasterclass from "../../../components/list/listMasterclass";
import useMasterclass from "../../../hooks/api/useMasterclass";
import {useTranslation} from "react-i18next";

const Masterclass = () => {

    const [masterclass, setMasterclass] = useState(false); // [state, function to update state
    const {loading, error, handleGetAll, handleDelete} = useMasterclass();
    const [refresh, setRefresh] = useState(false);
    const [id, setId] = useState(null);

    const { i18n, t } = useTranslation();

    useEffect(() => {
        handleGetAll().then((response) => {
            setMasterclass(response.reverse());
        }).catch((error) => {
            console.log(error);
        });
    }, [refresh]);

    const handleMasterclassDelete = () => {
        handleDelete(id).then((response) => {
            setRefresh(!refresh);
        }).catch((error) => {
            console.log(error);
        });
    }


    return (
            <div className="main-container">
                <div className="main-content">
                    <Button text={ t('bouton.add_masterclass') } link={"#/masterclass/add"} className={"red-full"} isIcon={true} icon={icon_add} />

                    <ListMasterclass masterclass={masterclass ? masterclass : false} error={error} isAdmin={true} deleteFunction={handleMasterclassDelete} setId={setId} />
                </div>
            </div>
        );

}

export default Masterclass;