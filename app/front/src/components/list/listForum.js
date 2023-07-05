import React from 'react';
import FiltersCard from "../filters/filtersCard";
import CardForum from "../card/cardForum";

const ListForum = ({text}) => {

    const tableTest = [0,1,2,3,4,5,6,7,8,9,10];

    return (
        <div className="container-forum">
            <div className="forum-row">
                <div className="container__header">
                    <h2>{ text }</h2>
                    <FiltersCard/>
                </div>

                <div className="container-forum__content">

                    {
                        tableTest.map((item, index) => {
                            return(
                                <CardForum key={index}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default ListForum;