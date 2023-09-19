import React, {useState, useEffect} from "react";
import CardRow from "../card/cardRow";
import Pastille from "../pastille/pastille";
import useMasterclass from "../../hooks/api/useMasterclass";
import Loader from "../loader/loader";
import useOeuvres from "../../hooks/api/useOeuvres";
import useCompositors from "../../hooks/api/useCompositors";
import bg_work from "../../assets/images/bg_work.jpg";
import {useReload} from "../../hooks/useReload";
import {useTranslation} from "react-i18next";


const ListHome = ({title}) => {

    const [filter, setFilter] = useState("courses");

    const [list, setList] = useState(false); // [state, function to update state

    const masterclass = useMasterclass();
    const works = useOeuvres();
    const composers = useCompositors();

    const {loading: masterclassLoading, error: masterclassError, handleGetAll: masterclassHandleGetAll} = masterclass;
    const {loading: oeuvreLoading, error: oeuvreError, handleGetAll: oeuvreHandleGetAll} = works;
    const {loading: composerLoading, error: composerError, handleGetAll: composerHandleGetAll} = composers;


    const [reload, setIsReload] = useState(false); // [state, function to update state
    const { i18n, t } = useTranslation();

    const handleClick = (e) => {
        setFilter(e);
    }

    //cut description if too long
    const cutDescription = (description) => {
        if(description.length > 80) {
            return description.slice(0, 80) + "...";
        } else {
            return description;
        }
    }




    useEffect(() => {
        console.log("reload", reload);
        filter === "courses" ?
            masterclassHandleGetAll().then((response) => {
                setList(response.reverse());
                setIsReload(false);
            }).catch((error) => {
                console.log(error);
            })
        : filter === "work" ?
            oeuvreHandleGetAll().then((response) => {
                setList(response.reverse());
                setIsReload(false);
            }).catch((error) => {
                console.log(error);
            }
        ) : filter === "composer" ?
            composerHandleGetAll().then((response) => {
                setList(response.reverse());
                setIsReload(false);
            }).catch((error) => {
                console.log(error);
            }
        ) : setList(false);

    }, [filter, reload]);



    return(
        <div className="container-home">
            <div className="container__header">
                <h2>{title}</h2>
                <div className="container__filters">
                    <Pastille text={t('home.pastille_masterclass')} className={`courses ${filter === "courses" ? "active" : ""}`} click={() => handleClick("courses")}/>
                    <Pastille text={t('home.pastille_work')} className={`work ${filter === "work" ? "active" : ""}`} click={() => handleClick("work")}/>
                    <Pastille text={t('home.pastille_composer')} className={`composer ${filter === "composer" ? "active" : ""}`} click={() => handleClick("composer")}/>
                </div>
            </div>

            <div className="container-home__content">
                {
                    list && list.length > 0 ?
                        list.map((item, index) => {
                            return index < 8 && (
                                <CardRow
                                    key={index}
                                    title={item.name}
                                    subtitle={
                                        filter === "courses" ? cutDescription("")
                                        : filter === "work" ? cutDescription(item.description)
                                        : filter === "composer" ? cutDescription(item.description)
                                        : ""
                                    }
                                    text={""} bouton={"Voir"}
                                    link={
                                        filter === "courses" ? "#/masterclass/" + item.id
                                      : filter === "work" ? "#/oeuvre/" + item.id
                                      : filter === "composer" ? "#/compositeur/" + item.id
                                      : "#"
                                    }
                                    image={
                                        filter === "courses" ? item.masterclassImage ? item.masterclassImage.contentUrl : "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2938&q=80"
                                        : filter === "work" ? "https://images.unsplash.com/photo-1507838153414-b4b713384a76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
                                        : filter === "composer" ? item.composerImage ? item.composerImage.contentUrl : "https://images.unsplash.com/photo-1621368286550-f54551f39b91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
                                        : ""
                                    }
                                    favoris={filter}
                                    isFavorite={ filter === "courses" ? item.favorite : item.isFavorite }
                                    //category or categories
                                    category={ filter === "composer" ? item.categories : item.category }
                                    id={item.id}
                                    reload={reload}
                                    setIsReload={setIsReload}
                                />
                            )
                        })
                        : list.length < 1 ?
                            <p>Aucune donnée à afficher</p>
                        : null
                }
            </div>
        </div>
    )

}

export default ListHome;