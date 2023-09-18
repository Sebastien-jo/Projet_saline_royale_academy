import React, {useEffect, useState} from "react";
import SidebarLibrary from "../../components/sidebar/Library/sidebarLibrary";
import CardFull from "../../components/card/cardFull";
import Pastille from "../../components/pastille/pastille";
import CardMyStudy from "../../components/card/cardMyStudy";
import CardFullSmall from "../../components/card/cardFullSmall";
import "../../styles/myStudy.css";
import {useSelector} from "react-redux";
import useMasterclassUser from "../../hooks/api/useMasterclassUser";
import {useTranslation} from "react-i18next";
import Loader from "../../components/loader/loader";


const MyStudy = () => {

    const [masterclass, setMasterclass] = useState(false); // [state, function to update state
    const {loading, error, handleGetAll } = useMasterclassUser();
    const [lastMasterclass, setLastMasterclass] = useState(false); // [state, function to update state

    //get user
    const user = useSelector(state => state.auth.user);
    const { i18n, t } = useTranslation();


    useEffect(() => {
        handleGetAll().then((response) => {
            setMasterclass(response);
            setLastMasterclass(response[response.length - 1]);
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <div className="main-container">
            {
                masterclass .length > 0 ?
                    <div className="main-content">

                        <CardMyStudy masterclass={lastMasterclass} />
                        <div className="other-study">
                            <h2>{ t('mystudy.otherStudy') }</h2>
                            <div className={"other-study-cards"}>
                                {
                                    loading ?
                                        <Loader/>
                                        :
                                        error ?
                                            <p>{ t('mystudy.otherStudy_error') }</p>
                                            :

                                    masterclass.length < 1  ?
                                        <p>{ t('mystudy.otherStudy_no_data') }</p>
                                        :

                                    masterclass.map((item, index) => {
                                        return index < masterclass.length - 1 && index < 6 && (
                                            <CardFullSmall key={index} title={item.masterclass.name} subtitle={`Professeur: ${item.masterclass.teacher.firstName} ${item.masterclass.teacher.lastName}`} background={item.masterclass.masterclassImage ? item.masterclass.masterclassImage.contentUrl : "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2938&q=80"} link={"#/masterclass/" + item.id} id={item.id} isFavorite={item.masterclass.isFavorite} />
                                        )
                                    })


                                }
                            </div>

                        </div>

                    </div>
                    :
                    <div className="main-content">

                        <div className="mystudy-container">
                            <div className={"mystudy-card"}>
                                {
                                    lastMasterclass ?
                                        <CardFull title={"Continuer la dernière masterclass que vous avez commencer !"} bouton={"Continuer"} link={"#/masterclass/" + lastMasterclass.masterclass.id} background={lastMasterclass.masterclass.masterclassImage ? lastMasterclass.masterclass.masterclassImage.contentUrl : "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2938&q=80"} id={lastMasterclass.masterclass.id} isFavorite={lastMasterclass.masterclass.isFavorite} />
                                        :
                                        <CardFull title={"Vous n'avez pas encore commencer de masterclass !"} bouton={"Commencer"} link={"#/library/masterclass"} background={"https://images.unsplash.com/photo-1471478331149-c72f17e33c73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2938&q=80"} />
                                }
                                </div>

                            <div className={"mystudy-content"}>
                                <div className={"mystudy-infos"}>
                                    <div className={"mystudy-header"}>
                                        <h2>{ t('mystudy.otherStudy_user')}  {user.firstName}</h2>
                                        <Pastille text={"Masterclass"} color={"violon"}/>
                                    </div>

                                    <p>{ t('mystudy.otherStudy_no_data') }</p>

                                </div>

                                <div className={"mystudy-progress"}>

                                </div>


                            </div>
                        </div>

                    </div>

            }

            <SidebarLibrary/>
        </div>
    );
}

export default MyStudy;