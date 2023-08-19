import React, {useEffect, useState} from "react";
import SidebarLibrary from "../../components/sidebar/sidebarLibrary";
import CardFull from "../../components/card/cardFull";
import Pastille from "../../components/pastille/pastille";
import CardMyStudy from "../../components/card/cardMyStudy";
import CardFullSmall from "../../components/card/cardFullSmall";
import "../../styles/myStudy.css";
import useMasterclass from "../../hooks/api/useMasterclass";


const MyStudy = () => {

    const [masterclass, setMasterclass] = useState([]); // [state, function to update state
    const {loading, error, handleGetAll } = useMasterclass();

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
                    <h2>Autres cours que vous pourriez aimer</h2>
                    <div className={"other-study-cards"}>
                        {
                            masterclass.map((item, index) => {
                                return(
                                    <CardFullSmall key={index} title={item.name} subtitle={`Professeur: ${item.teacher.firstName} ${item.teacher.lastName}`} background={"https://picsum.photos/900/1000"} link={"#/masterclass/" + item.id} id={item.id}/>
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