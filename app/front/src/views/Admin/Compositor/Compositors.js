import React, {useEffect, useState} from 'react';
import Button from "../../../components/button/button";
import icon_add from "../../../assets/icones/icon-add-White.svg";
import ListCompositors from "../../../components/list/listCompositors";
import useCompositors from "../../../hooks/api/useCompositors";

const Compositors = () => {

    return (
        <div className="main-container">
            <div className="main-content">
                <Button text="Ajouter un compositeur" link={"#/compositeurs/add"} className={"red-full"} isIcon={true} icon={icon_add} />

                <ListCompositors />
            </div>
        </div>
    );

}

export default Compositors;