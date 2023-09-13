import React,{useState, useEffect} from "react";
import Badge from "../../../components/badge/badge";
import "../../../styles/progress.css";
import SidebarProgress from "../../../components/sidebar/sidebarProgress";
import MenuBar from "../../../components/navbar/MenuBar";
import useBadges from "../../../hooks/api/useBadges";
import {useTranslation} from "react-i18next";

const Progress = () => {

    const [badges, setBadges] = useState([]);
    const {loading, error, handleGetAll} = useBadges();

    const { i18n, t } = useTranslation();

    useEffect(() => {
        handleGetAll().then((response) => {
            console.log(response);
            setBadges(response);
        }).catch((err) => {
            console.log(err);
        });
    }, []);



    return (
        <div className="main-container">
            <div className="main-content isMenu isSidebar">
                <MenuBar items={[
                    {
                        name: `${t('account.menuBar.information')}`,
                        link: "/account",
                    },
                    {
                        name: `${t('account.menuBar.progress')}`,
                        link: "/account/progression",
                        active: true
                    },
                    {
                        name: `${t('account.menuBar.legals')}`,
                        link: "/account/mentions-legales"
                    }]}/>

                <div className={"container-padding"}>
                    <div className="progress-container">
                        <h2>{t('badges.title')}</h2>
                        <div className={"badge-list"}>
                            {
                                badges.map((item, index) => {
                                    return (
                                        <Badge key={index} name={item.category} image={item.badgeImage.contentUrl} />
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className={"badge-container"}>
                        <h2>{t('badges.badges')}</h2>

                        <div className={"badge-list"}>
                            {
                                badges.map((item, index) => {
                                    return (
                                        <Badge key={index} name={item.category} image={item.badgeImage.contentUrl} />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>

            <SidebarProgress />
        </div>
    );
}

export default Progress;
