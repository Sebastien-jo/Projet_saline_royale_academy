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
import {useTranslation} from "react-i18next";

const MasterclassLibrary = () => {

    const [masterclassUser, setMasterclassUser] = useState(false); // [state, function to update state

    const [masterclass, setMasterclass] = useState(false); // [state, function to update state
    const {loading, error, handleGetAll } = useMasterclass();
    const { sidebarContent, updateSidebarContent, clearSidebarContent } = useSidebarContent();

    const [reload, setIsReload] = useState(false); // [state, function to update state



    const {handleGet} = useMasterclassUser();
    const user = useSelector(state => state.auth.user);
    const { i18n, t } = useTranslation();


    //if reload
    useEffect(() => {
        handleGetAll().then((response) => {
            setMasterclass(response.reverse());
            setIsReload(false);
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });

        handleGet(user.id).then((response) => {
            setMasterclassUser(response);
            setIsReload(false);
        }).catch((err) => {
            console.log(err);
        })

        }, [reload]);

    return (
        <div className="main-container">
            <div className="main-content isSidebar menuTabs">
                <MenuBar items={[
                    {
                        name: `${t('library.menuBar.masterclass')}`,
                        link: "/library/masterclass",
                        isLinkActive: true,
                    },
                    {
                        name: `${t('library.menuBar.work')}`,
                        link: "/library/oeuvres",
                        isLinkActive: false,
                    },
                    {
                        name: `${t('library.menuBar.composer')}`,
                        link: "/library/compositeur",
                        isLinkActive: false,

                    }]}/>

                <ListMasterclass masterclass={masterclass ? masterclass : false} error={error} favoris={"masterclass"} updateSidebarContent={updateSidebarContent} loading={loading} setIsReload={setIsReload}/>

            </div>
            <SidebarLibrary sidebarContent={sidebarContent} clearSidebarContent={clearSidebarContent} type={"masterclass"} />
        </div>
    );
}

export default MasterclassLibrary;