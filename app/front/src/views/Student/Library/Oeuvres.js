import React, {useEffect, useState} from 'react';
import MenuBar from "../../../components/navbar/MenuBar";
import "../../../styles/library.css";
import SidebarLibrary from "../../../components/sidebar/sidebarLibrary";
import ListOeuvres from "../../../components/list/listOeuvres";
import useOeuvres from "../../../hooks/api/useOeuvres";


const OeuvresLibrary = () => {

    const [oeuvres, setOeuvres] = useState(false); // [state, function to update state
    const {loading, error, handleGetAll} = useOeuvres();

    useEffect(() => {
        handleGetAll().then((response) => {
            setOeuvres(response);
            console.log(response);
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
                        link: "/library/masterclass",
                        isLinkActive: false,
                    },
                    {
                        name: "Oeuvres",
                        link: "/library/oeuvres",
                        isLinkActive: true,
                    },
                    {
                        name: "Compositeur",
                        link: "/library/compositeur",
                        isLinkActive: false,
                    }]}/>

                    <ListOeuvres oeuvres={oeuvres ? oeuvres : false} error={error} favoris={"oeuvre"}/>

            </div>
            <SidebarLibrary/>
        </div>
    );
}

export default OeuvresLibrary;