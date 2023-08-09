import React, {useEffect, useState} from 'react';
import {getCompositors} from "../../../api/endpoints/compositor";
import Button from "../../../components/button/button";
import icon_add from "../../../assets/icones/icon-add-White.svg";
import ListCompositors from "../../../components/list/listCompositors";
import ListLibraryOeuvres from "../../../components/list/listLibraryOeuvres";
import {getOeuvres} from "../../../api/endpoints/oeuvres";

const Oeuvres = () => {

   const [oeuvres, setOeuvres] = useState([]); // [state, function to update state


    //call api to get list of composers
    useEffect(() => {
       getOeuvres().then((response) => {
            setOeuvres(response['hydra:member']);
            console.log(response['hydra:member']);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <div className="main-container">
            <div className="main-content">
                <Button text="Ajouter une oeuvre" link={"#/oeuvres/add"} className={"red-full"} isIcon={true} icon={icon_add} />

                <ListLibraryOeuvres list={oeuvres}/>
            </div>
        </div>
    );

}

export default Oeuvres;