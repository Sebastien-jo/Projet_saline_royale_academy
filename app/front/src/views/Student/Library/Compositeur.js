import React, {useEffect, useState} from 'react';
import MenuBar from "../../../components/navbar/MenuBar";
import ListCompositors from "../../../components/list/listCompositors";
import "../../../styles/library.css";
import SidebarLibrary from "../../../components/sidebar/Library/sidebarLibrary";
import useCompositors from "../../../hooks/api/useCompositors";
import useSidebarContent from "../../../hooks/useSidebarContent";
import {useTranslation} from "react-i18next";

const CompositeurLibrary = () => {

    const [compositors, setCompositors] = useState(false); // [state, function to update state
    const {loading, error, handleGetAll} = useCompositors();
    const { i18n, t } = useTranslation();

    const { sidebarContent, updateSidebarContent, clearSidebarContent } = useSidebarContent();

    const [reload, setIsReload] = useState(false); // [state, function to update state

    useEffect(() => {
        handleGetAll().then((response) => {
            setCompositors(response.reverse());
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
                        isLinkActive: false,
                    },
                    {
                        name: `${t('library.menuBar.composer')}`,
                        link: "/library/compositeur",
                        isLinkActive: true,

                    }]}/>

                <ListCompositors compositors={compositors ? compositors : false} error={error} favoris={"composer"} updateSidebarContent={updateSidebarContent} loading={loading} setIsReload={setIsReload} />
            </div>
            <SidebarLibrary sidebarContent={sidebarContent} clearSidebarContent={clearSidebarContent} type={"composer"} />
        </div>
    );
}

export default CompositeurLibrary;