import React, {useEffect, useState} from "react";
import MenuBar from "../../../components/navbar/MenuBar";
import SidebarLibrary from "../../../components/sidebar/Library/sidebarLibrary";
import ListOeuvres from "../../../components/list/listOeuvres";
import useFavoris from "../../../hooks/api/useFavoris";
import useSidebarContent from "../../../hooks/useSidebarContent";

const Oeuvres = () => {

    const [oeuvres, setOeuvres] = useState(false); // [state, function to update state
    const {loading, error, handleGetAllFavorisOeuvre} = useFavoris();

    const { sidebarContent, updateSidebarContent, clearSidebarContent } = useSidebarContent();

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
            <div className="main-content isSidebar menuTabs">
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

                <ListOeuvres oeuvres={oeuvres ? oeuvres : false} error={error} updateSidebarContent={updateSidebarContent} loading={loading} />

            </div>
            <SidebarLibrary sidebarContent={sidebarContent} clearSidebarContent={clearSidebarContent} type={"work"} />
        </div>
    );
}

export default Oeuvres;