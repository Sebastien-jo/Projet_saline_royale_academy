import React, {useEffect, useState} from 'react';
import Button from "../../../components/button/button";
import icon_add from "../../../assets/icones/icon-add-White.svg";
import ListCompositors from "../../../components/list/listCompositors";
import useCompositors from "../../../hooks/api/useCompositors";


const Compositors = () => {

    const [compositors, setCompositors] = useState(false); // [state, function to update state
    const {loading, error, handleGetAll} = useCompositors();

    useEffect(() => {
        handleGetAll().then((response) => {
            setCompositors(response);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        <div className="main-container">
            <div className="main-content">
                <Button text="Ajouter un compositeur" link={"#/compositeurs/add"} className={"red-full"} isIcon={true} icon={icon_add} />

                <ListCompositors compositors={compositors ? compositors : false} error={error}/>
            </div>
        </div>
    );

}

export default Compositors;