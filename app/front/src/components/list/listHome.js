import React from "react";
import CardRow from "../card/cardRow";
import FiltersCard from "../filters/filtersCard";

const ListHome = ({title, isFilter = false}) => {
    const tableTest = [0,1,2,3,4,5,6,7,8,9,10];

    return(
        <div className="container-home">
            <div className="container__header">
                <h2>{title}</h2>
                { isFilter ? <FiltersCard/> : null }
            </div>

            <div className="container-home__content">
                {
                    tableTest.map((item, index) => {
                        return(
                            <CardRow title={"Titre de la card"} subtitle={"Titre de la card"} text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."} bouton={"Voir"} link={"#"} image={"https://picsum.photos/200/300"} key={index}/>
                        )
                    })
                }
            </div>
        </div>
    )

}

export default ListHome;