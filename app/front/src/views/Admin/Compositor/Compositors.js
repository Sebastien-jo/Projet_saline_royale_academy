import React, {useEffect, useState} from 'react';
import Button from "../../../components/button/button";
import icon_add from "../../../assets/icones/icon-add-White.svg";
import ListLibraryCompositors from "../../../components/list/listLibraryCompositors";
import useCompositors from "../../../hooks/useCompositors";

const Compositors = () => {

    const [compositors, setCompositors] = useState([]); // [state, function to update state
    const {loading, error, handleGetAll} = useCompositors();

    useEffect(() => {
        handleGetAll().then((response) => {
            console.log(response);
            setCompositors(response);
        }).catch((err) => {
            console.log(err);
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