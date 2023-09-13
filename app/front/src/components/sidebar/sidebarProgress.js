import React, {useEffect, useState} from "react";
import "../../styles/components/sidebar.css";
import Pastille from "../pastille/pastille";
import Button from "../button/button";
import useUsers from "../../hooks/api/useUsers";
import {useSelector} from "react-redux";
import useMasterclassUser from "../../hooks/api/useMasterclassUser";
import {useParseDate} from "../../hooks/useParseDate";
import useSidebar from "../../hooks/useSidebarContent";
import leconIcon from "../../assets/icones/icon-pause-Default.svg";
import masterclassIcon from "../../assets/icones/icon-video-Blue-stroke.svg";
import instrumentIcon from "../../assets/icones/icon-music-Default.svg";
import badgeIcon from "../../assets/icones/icon-badge-Default.svg";
import {useTranslation} from "react-i18next";

const SidebarProgress = () => {

    const {loading, error, handleGet} = useUsers();
    const [user, setUser] = useState(false);
    const userRedux = useSelector(state => state.auth.user);
    const [masterclass, setMasterclass] = useState(false);

    const {handleGetAll: handleGetMasterclass} = useMasterclassUser();

    const {parseDate} = useParseDate();

    const {clearSidebarContent} = useSidebar();
    const { i18n, t } = useTranslation();


    useEffect(() => {
        handleGet(userRedux.id).then((response) => {
            setUser(response.stats);
        }).catch((err) => {
            console.log(err);
        });

        handleGetMasterclass().then((response) => {
            console.log(response[response.length - 1].masterclass);
            setMasterclass(response[response.length - 1].masterclass);
        }).catch((err) => {
            console.log(err);
        });
    }, []);


    return (
        <div className="sidebar">
            <div className="sidebar__progress">
                <h3>{ t('sidebarProgress.title') }</h3>
                <div className="sidebar__progress__level">
                    <div className="sidebar__progress__level__bar">
                    </div>
                </div>
                {
                    user ?
                    <div className="sidebar__progress__infos">
                        <div className="sidebar__progress__infos__row">
                            <img src={leconIcon} />
                            <span className={"subtitle"}>{ user.nbLessonFinished } { t('sidebarProgress.lesson_finish') }</span>
                        </div>
                        <div className="sidebar__progress__infos__row">
                            <img src={masterclassIcon} />
                            <span className={"subtitle"}>{ user.nbMasterclass } { t('sidebarProgress.masterclass_follow') }</span>
                        </div>
                        <div className="sidebar__progress__infos__row">
                            <img src={instrumentIcon} />
                            <span className={"subtitle"}>{ user.nbInstrument } { t('sidebarProgress.instrument_learn') }</span>
                        </div>
                        <div className={"sidebar__progress__infos__row"}>
                            <img src={badgeIcon} />
                            <span className={"subtitle"}>{ user.nbBadge } { t('sidebarProgress.badges_earned') }</span>
                        </div>
                    </div>
                    : null
                }
                {
                    masterclass ?
                        <div className="sidebar__masterclass no-gap">
                            <div className={"sidebar__masterclass"}>
                                <h3>{ t('sidebarProgress.continue_lesson') }</h3>
                                <div className="sidebar__masterclass_content">
                                    <div className="sidebar__img">
                                        <img src={masterclass.masterclassImage ? masterclass.masterclassImage.contentUrl : "https://images.unsplash.com/photo-1452724931113-5ab6340ce080?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"} />
                                    </div>
                                    <div className="sidebar__masterclass">
                                        <div className="sidebar__header">
                                            <h2>{ masterclass.name }</h2>
                                            <Pastille text={masterclass.work.category.name} className={masterclass.work.category.name.toLowerCase()} />
                                        </div>
                                        <span className={"title-subtitle"}>{ t('card.professor') } : {masterclass.teacher.firstName} {masterclass.teacher.lastName}</span>
                                        <span className={"title-subtitle"}>{ t('card.date') } : { parseDate(masterclass.createdAt) }</span>

                                        <p>{masterclass.description}</p>
                                        <Button className={"red-full"} text={ t('bouton.continu') } link={`#/masterclass/${masterclass.id}` } click={clearSidebarContent} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <>
                            <p>{ t('sidebarProgress.lesson_not_started') }</p>
                            <Button className={"red-full"} text={ t('bouton.start') } link={`#/masterclass`} click={clearSidebarContent} />
                        </>

                }
            </div>
        </div>
    )
}


export default SidebarProgress;