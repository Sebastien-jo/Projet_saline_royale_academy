import React from "react";
import ListNotations from "../../components/list/listNotations";
import Button from "../../components/button/button";


const Gestion = () => {
    return (
        <div className="main-container">
            <div className="main-content">
                <Button text="Ajouter un cours" link={"/gestion/ajout"} className={"red-full"} isIcon={true} icon="" />

                <ListNotations text="Gérer mes cours" />
            </div>
        </div>
    );
}

export default Gestion;