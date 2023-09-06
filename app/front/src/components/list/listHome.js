import React, {useState, useEffect} from "react";
import CardRow from "../card/cardRow";
import Pastille from "../pastille/pastille";
import useMasterclass from "../../hooks/api/useMasterclass";
import Loader from "../loader/loader";
import useOeuvres from "../../hooks/api/useOeuvres";
import useCompositors from "../../hooks/api/useCompositors";
import bg_work from "../../assets/images/bg_work.jpg";


const ListHome = ({title}) => {

    const [filter, setFilter] = useState("courses");

    const [list, setList] = useState(false); // [state, function to update state

    const masterclass = useMasterclass();
    const works = useOeuvres();
    const composers = useCompositors();

    const {loading: masterclassLoading, error: masterclassError, handleGetAll: masterclassHandleGetAll} = masterclass;
    const {loading: oeuvreLoading, error: oeuvreError, handleGetAll: oeuvreHandleGetAll} = works;
    const {loading: composerLoading, error: composerError, handleGetAll: composerHandleGetAll} = composers;



    const handleClick = (e) => {
        setFilter(e);
    }

    useEffect(() => {
        filter === "courses" ?
            masterclassHandleGetAll().then((response) => {
                setList(response.reverse());
            }).catch((error) => {
                console.log(error);
            })
        : filter === "work" ?
            oeuvreHandleGetAll().then((response) => {
                setList(response.reverse());
            }).catch((error) => {
                console.log(error);
            }
        ) : filter === "composer" ?
            composerHandleGetAll().then((response) => {
                setList(response.reverse());
            }).catch((error) => {
                console.log(error);
            }
        ) : setList(false);
    }, [filter]);

    console.log(list);

    return(
        <div className="container-home">
            <div className="container__header">
                <h2>{title}</h2>
                <div className="container__filters">
                    <Pastille text={"Masterclass"} className={`courses ${filter === "courses" ? "active" : ""}`} click={() => handleClick("courses")}/>
                    <Pastille text={"Oeuvres"} className={`work ${filter === "work" ? "active" : ""}`} click={() => handleClick("work")}/>
                    <Pastille text={"Compositeurs"} className={`composer ${filter === "composer" ? "active" : ""}`} click={() => handleClick("composer")}/>
                </div>
            </div>

            <div className="container-home__content">
                {
                    list ?
                        list.map((item, index) => {
                            return index < 8 && (
                                <CardRow
                                    key={index}
                                    title={item.name}
                                    subtitle={"Titre de la card"}
                                    text={""} bouton={"Voir"}
                                    link={
                                        filter === "courses" ? "#/masterclass/" + item.id
                                      : filter === "work" ? "#/oeuvre/" + item.id
                                      : filter === "composer" ? "#/compositeur/" + item.id
                                      : "#"
                                    }
                                    image={
                                        filter === "courses" ? item.masterclassImage ? item.masterclassImage.contentUrl : ""
                                        : filter === "work" ? bg_work
                                        : filter === "composer" ? item.composerImage ? item.composerImage.contentUrl : ""
                                        : ""
                                    }
                                    favoris={filter}
                                    isFavorite={item.isFavorite}
                                    //category or categories
                                    category={ filter === "composer" ? item.categories : item.category }
                                    id={item.id}
                                />
                            )
                        })
                        : masterclassError || oeuvreError || composerError ?
                        <p>Une erreur est survenue</p>
                        :
                        <Loader/>
                }
            </div>
        </div>
    )

}

export default ListHome;