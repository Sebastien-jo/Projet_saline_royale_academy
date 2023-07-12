import React, {useEffect, useState} from 'react';
import Button from "../../../components/button/button";
import icon_add from "../../../assets/icones/icon-add-White.svg";
import ListLibraryCompositors from "../../../components/list/listLibraryCompositors";
import {getCompositors} from "../../../api/endpoints/compositor";

const Compositors = () => {

    const [compositors, setCompositors] = useState([]); // [state, function to update state

    //call api to get list of composers
    useEffect(() => {
        getCompositors().then((response) => {
            setCompositors(response['hydra:member']);
            console.log(response['hydra:member']);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <div className="main-container">
            <div className="main-content">
                <Button text="Ajouter un compositeur" link={"#/compositeurs/add"} className={"red-full"} isIcon={true} icon={icon_add} />

                <ListLibraryCompositors list={compositors}/>
            </div>
        </div>
    );

}

export default Compositors;