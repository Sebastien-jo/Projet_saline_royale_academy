import React, {useEffect, useState} from 'react';
import Button from "../../../components/button/button";
import icon_add from "../../../assets/icones/icon-add-White.svg";
import ListCompositors from "../../../components/list/listCompositors";
import useCompositors from "../../../hooks/api/useCompositors";
import {useTranslation} from "react-i18next";


const Compositors = () => {

    const [compositors, setCompositors] = useState(false); // [state, function to update state
    const {loading, error, handleGetAll, handleDelete} = useCompositors();
    const [id, setId] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const { i18n, t } = useTranslation();

    useEffect(() => {
        handleGetAll().then((response) => {
            setCompositors(response.reverse());
        }).catch((err) => {
            console.log(err);
        });
    }, [refresh]);

    const handleCompositorDelete = () => {
        handleDelete(id).then((response) => {
            setRefresh(!refresh);
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className="main-container">
            <div className="main-content">
                <Button text={ t('bouton.add_composer') } link={"#/compositeurs/add"} className={"red-full"} isIcon={true} icon={icon_add} />

                <ListCompositors compositors={compositors ? compositors : false} error={error} loading={loading} isAdmin={true} deleteFunction={handleCompositorDelete} setId={setId} />
            </div>
        </div>
    );

}

export default Compositors;