import React from 'react';
import CardColumn from "../card/cardColumn";
import FiltersCard from "../filters/filtersCard";

const ListNotations = ({text}) => {

    const tableTest = [0,1,2,3,4,5,6,7,8,9,10];

    return (
        <div className="container-list">
            <div className="list-row">
                <div className="container__header">
                    <h2>{ text }</h2>
                    <FiltersCard/>
                </div>

                <div className="container-list__content">

                    {
                        tableTest.map((item, index) => {
                            return(
                                <CardColumn key={index}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default ListNotations;