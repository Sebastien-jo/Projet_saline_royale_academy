import React, {useEffect, useState} from 'react';
import MenuBar from "../../../components/navbar/MenuBar";
import "../../../styles/library.css";
import SidebarLibrary from "../../../components/sidebar/sidebarLibrary";
import ListMasterclass from "../../../components/list/listMasterclass";
import useMasterclass from "../../../hooks/api/useMasterclass";

const MasterclassLibrary = () => {

    const [masterclass, setMasterclass] = useState(false); // [state, function to update state
    const {loading, error, handleGetAll } = useMasterclass();

    useEffect(() => {
        handleGetAll().then((response) => {
            setMasterclass(response);
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
    }, []);


    return (
        <div className="main-container">
            <div className="main-content isSidebar">
                <MenuBar items={[
                    {
                        name: "Masterclass",
                        link: "/library/masterclass",
                        isLinkActive: true,
                    },
                    {
                        name: "Oeuvres",
                        link: "/library/oeuvres",
                        isLinkActive: false,
                    },
                    {
                        name: "Compositeur",
                        link: "/library/compositeur",
                        isLinkActive: false,
                    }]}/>

                <ListMasterclass masterclass={masterclass ? masterclass : false} error={error} favoris={"masterclass"}/>

            </div>
            <SidebarLibrary/>
        </div>
    );
}

export default MasterclassLibrary;