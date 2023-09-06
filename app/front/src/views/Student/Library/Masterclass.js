import React, {useEffect, useState} from 'react';
import MenuBar from "../../../components/navbar/MenuBar";
import "../../../styles/library.css";
import SidebarLibrary from "../../../components/sidebar/Library/sidebarLibrary";
import ListMasterclass from "../../../components/list/listMasterclass";
import useMasterclass from "../../../hooks/api/useMasterclass";
import {useReload} from "../../../hooks/useReload";
import useMasterclassUser from "../../../hooks/api/useMasterclassUser";
import {useSelector} from "react-redux";
import useSidebarContent from "../../../hooks/useSidebarContent";


const MasterclassLibrary = () => {

    const [masterclassUser, setMasterclassUser] = useState(false); // [state, function to update state

    const [masterclass, setMasterclass] = useState(false); // [state, function to update state
    const {loading, error, handleGetAll } = useMasterclass();
    const { sidebarContent, updateSidebarContent, clearSidebarContent } = useSidebarContent();



    const {handleGet} = useMasterclassUser();
    const user = useSelector(state => state.auth.user);

    const {reload} = useReload();


    //if reload
    useEffect(() => {

        handleGetAll().then((response) => {
            setMasterclass(response);
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });


        handleGet(user.id).then((response) => {
            setMasterclassUser(response);
        }).catch((err) => {
            console.log(err);
        })

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

                <ListMasterclass masterclass={masterclass ? masterclass : false} error={error} favoris={"masterclass"} updateSidebarContent={updateSidebarContent} />

            </div>
            <SidebarLibrary sidebarContent={sidebarContent} clearSidebarContent={clearSidebarContent} type={"masterclass"} />
        </div>
    );
}

export default MasterclassLibrary;