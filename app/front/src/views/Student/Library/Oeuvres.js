import React, { useEffect, useState } from 'react';
import MenuBar from "../../../components/navbar/MenuBar";
import "../../../styles/library.css";
import SidebarLibrary from "../../../components/sidebar/Library/sidebarLibrary";
import ListOeuvres from "../../../components/list/listOeuvres";
import useOeuvres from "../../../hooks/api/useOeuvres";
import useSidebarContent from "../../../hooks/useSidebarContent";
import {useReload} from "../../../hooks/useReload";
import {useTranslation} from "react-i18next";

const OeuvresLibrary = () => {
    const [oeuvres, setOeuvres] = useState(false);
    const {loading, error, handleGetAll, handleDelete} = useOeuvres();
    const [reload, setIsReload] = useState(false); // [state, function to update state


    const { i18n, t } = useTranslation();
    const { sidebarContent, updateSidebarContent, clearSidebarContent } = useSidebarContent();

    useEffect(() => {
        handleGetAll().then((response) => {
            setOeuvres(response.reverse());
            setIsReload(false);
        }).catch((err) => {
            console.log(err);
        });
    }, [reload]);


    return (
        <div className="main-container">
            <div className="main-content isSidebar menuTabs">
                <MenuBar items={[
                    {
                        name: `${t('library.menuBar.masterclass')}`,
                        link: "/library/masterclass",
                        isLinkActive: false,
                    },
                    {
                        name: `${t('library.menuBar.work')}`,
                        link: "/library/oeuvres",
                        isLinkActive: true,
                    },
                    {
                        name: `${t('library.menuBar.composer')}`,
                        link: "/library/compositeur",
                        isLinkActive: false,

                    }]}/>

                <ListOeuvres oeuvres={oeuvres ? oeuvres : false} error={error} favoris={"oeuvre"} updateSidebarContent={updateSidebarContent} loading={loading} setIsReload={setIsReload} />

            </div>
            <SidebarLibrary sidebarContent={sidebarContent} clearSidebarContent={clearSidebarContent} type={"work"} />

        </div>
    );
}

export default OeuvresLibrary;
