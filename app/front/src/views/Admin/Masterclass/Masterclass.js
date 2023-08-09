import React, {useEffect} from 'react';
import Button from "../../../components/button/button";
import icon_add from "../../../assets/icones/icon-add-White.svg";
import ListCompositors from "../../../components/list/listCompositors";
import ListLibraryMasterclass from "../../../components/list/listMasterclass";
import {getMasterclasses} from "../../../api/endpoints/masterclass";

const Masterclass = () => {

        const [masterclass, setMasterclass] = React.useState([]);

        useEffect(() => {
            getMasterclasses().then((response) => {
                setMasterclass(response['hydra:member']);
                console.log(response['hydra:member']);
            }).catch((error) => {
                console.log(error);
            });
        }, []);

        return (
            <div className="main-container">
                <div className="main-content">
                    <Button text="Ajouter une masterclass" link={"#/masterclass/add"} className={"red-full"} isIcon={true} icon={icon_add} />

                    <ListLibraryMasterclass list={masterclass}/>
                </div>
            </div>
        );

}

export default Masterclass;