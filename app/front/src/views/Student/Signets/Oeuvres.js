import React, {useEffect} from "react";
import MenuBar from "../../../components/navbar/MenuBar";
import SidebarLibrary from "../../../components/sidebar/sidebarLibrary";
import ListLibraryOeuvres from "../../../components/list/listLibraryOeuvres";
import {getOeuvres} from "../../../api/endpoints/oeuvres";

const Oeuvres = () => {

    const [oeuvres, setOeuvres] = React.useState([]);

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
                        isLinkActive: true,
                    },
                    {
                        name: "Compositeur",
                        link: "/signets/compositeur",
                        isLinkActive: false,
                    }]}/>

                <ListLibraryOeuvres list={oeuvres}/>
            </div>
            <SidebarLibrary/>
        </div>
    );
}

export default Oeuvres;