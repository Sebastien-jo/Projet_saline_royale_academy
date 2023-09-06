import React, {useEffect, useState} from "react";
import SidebarLibrary from "../../components/sidebar/Library/sidebarLibrary";
import CardFull from "../../components/card/cardFull";
import Pastille from "../../components/pastille/pastille";
import CardMyStudy from "../../components/card/cardMyStudy";
import CardFullSmall from "../../components/card/cardFullSmall";
import "../../styles/myStudy.css";
import useMasterclass from "../../hooks/api/useMasterclass";
import useMasterclassUser from "../../hooks/api/useMasterclassUser";


const MyStudy = () => {

    const [masterclass, setMasterclass] = useState(false); // [state, function to update state
    const {loading, error, handleGetAll } = useMasterclassUser();

    useEffect(() => {
        handleGetAll().then((response) => {
            setMasterclass(response);
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <div className="main-container">
            <div className="main-content">

                <CardMyStudy />

                <div className="other-study">
                    <h2>Vos autres cours</h2>
                    <div className={"other-study-cards"}>
                        {
                            masterclass && masterclass.map((item, index) => {
                                return index < 6 && (
                                    <CardFullSmall key={index} title={item.masterclass.name} subtitle={`Professeur: ${item.masterclass.teacher.firstName} ${item.masterclass.teacher.lastName}`} background={"https://picsum.photos/900/1000"} link={"#/masterclass/" + item.masterclass.id} id={item.masterclass.id} isFavorite={item.masterclass.isFavorite} />
                                )
                            })
                        }
                    </div>

                </div>

            </div>

            <SidebarLibrary/>
        </div>
    );
}

export default MyStudy;