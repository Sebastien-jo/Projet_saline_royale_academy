import React, {useEffect, useState} from 'react';
import MenuBar from "../../../components/navbar/MenuBar";
import ListCompositors from "../../../components/list/listCompositors";
import "../../../styles/library.css";
import SidebarLibrary from "../../../components/sidebar/sidebarLibrary";
import useCompositors from "../../../hooks/api/useCompositors";
import useSidebarContent from "../../../hooks/useSidebarContent";

const CompositeurLibrary = () => {

    const [compositors, setCompositors] = useState(false); // [state, function to update state
    const {loading, error, handleGetAll} = useCompositors();

    const { sidebarContent, updateSidebarContent, clearSidebarContent } = useSidebarContent();


    useEffect(() => {
        handleGetAll().then((response) => {
            setCompositors(response);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    console.log(sidebarContent);

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
                        isLinkActive: false,
                    },
                    {
                        name: "Compositeur",
                        link: "/library/compositeur",
                        isLinkActive: true,

                    }]}/>

                <ListCompositors compositors={compositors ? compositors : false} error={error} favoris={"composer"} updateSidebarContent={updateSidebarContent} />
            </div>
            <SidebarLibrary sidebarContent={sidebarContent} clearSidebarContent={clearSidebarContent} type={"composer"} />
        </div>
    );
}

export default CompositeurLibrary;