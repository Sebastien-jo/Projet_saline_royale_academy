import React, {useEffect, useState} from 'react';
import MenuBar from "../../../components/navbar/MenuBar";
import ListCompositors from "../../../components/list/listCompositors";
import "../../../styles/library.css";
import SidebarLibrary from "../../../components/sidebar/sidebarLibrary";
import useCompositors from "../../../hooks/api/useCompositors";

const CompositeurLibrary = () => {

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

                <ListCompositors list={compositors}/>
            </div>
            <SidebarLibrary/>
        </div>
    );
}

export default CompositeurLibrary;