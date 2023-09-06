import React, {useEffect, useState} from "react";
import MenuBar from "../../../components/navbar/MenuBar";
import SidebarLibrary from "../../../components/sidebar/Library/sidebarLibrary";
import ListOeuvres from "../../../components/list/listOeuvres";
import useFavoris from "../../../hooks/api/useFavoris";

const Oeuvres = () => {

    const [oeuvres, setOeuvres] = useState(false); // [state, function to update state
    const {loading, error, handleGetAllFavorisOeuvre} = useFavoris();

    useEffect(() => {
        handleGetAllFavorisOeuvre().then((response) => {
            console.log(response)
            setOeuvres(response.map((oeuvre) => {
                return oeuvre.work;
            }));
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
                        isLinkActive: true,
                    },
                    {
                        name: "Compositeur",
                        link: "/signets/compositeur",
                        isLinkActive: false,
                    }]}/>

                <ListOeuvres oeuvres={oeuvres ? oeuvres : []} error={error}/>
            </div>
            <SidebarLibrary/>
        </div>
    );
}

export default Oeuvres;