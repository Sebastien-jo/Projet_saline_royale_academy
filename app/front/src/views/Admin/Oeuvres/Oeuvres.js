import React, {useEffect, useState} from 'react';
import {getCompositors} from "../../../api/endpoints/compositor";
import Button from "../../../components/button/button";
import icon_add from "../../../assets/icones/icon-add-White.svg";
import ListOeuvres from "../../../components/list/listOeuvres";
import useOeuvres from "../../../hooks/api/useOeuvres";

const Oeuvres = () => {

    const [oeuvres, setOeuvres] = useState(false); // [state, function to update state
    const {loading, error, handleGetAll} = useOeuvres();

    useEffect(() => {
        handleGetAll().then((response) => {
            setOeuvres(response);
            console.log(response);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        <div className="main-container">
            <div className="main-content">
                <Button text="Ajouter une oeuvre" link={"#/oeuvres/add"} className={"red-full"} isIcon={true} icon={icon_add} />

                <ListOeuvres oeuvres={oeuvres ? oeuvres : false} error={error}/>
            </div>
        </div>
    );

}

export default Oeuvres;