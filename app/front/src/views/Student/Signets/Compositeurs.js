import React, {useEffect, useState} from "react";
import MenuBar from "../../../components/navbar/MenuBar";
import ListCompositors from "../../../components/list/listCompositors";
import SidebarLibrary from "../../../components/sidebar/sidebarLibrary";

import useFavoris from "../../../hooks/api/useFavoris";


const Compositeurs = () => {

    const [compositors, setCompositors] = useState(false); // [state, function to update state
    const {loading, error, handleGetAllFavorisComposer} = useFavoris();

    useEffect(() => {
        handleGetAllFavorisComposer().then((response) => {
            setCompositors(response);
        }).catch((err) => {
            console.log(err);
        });
    }, []);


    return (
        <div className="main-container">
            <div className="main-content isSidebar">
                <MenuBar items={[
                    {
                        name: "Masterclass",
                        link: "/signets/masterclass",
                        isLinkActive: false,
                    },
                    {
                        name: "Oeuvres",
                        link: "/signets/oeuvres",
                        isLinkActive: false,
                    },
                    {
                        name: "Compositeur",
                        link: "/signets/compositeur",
                        isLinkActive: true,

                    }]}/>
                <ListCompositors compositors={compositors ? compositors : false} error={error}/>
            </div>
            <SidebarLibrary/>
        </div>
    );
}

export default Compositeurs;