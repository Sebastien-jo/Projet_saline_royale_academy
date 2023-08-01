import React from 'react';
import FiltersCard from "../filters/filtersCard";
import CardForum from "../card/cardForum";

const ListForum = ({text, list}) => {


    return (
        <div className="container-forum">
            <div className="forum-row">
                <div className="container__header">
                    <h2>{ text }</h2>
                    <FiltersCard/>
                </div>

                <div className="container-forum__content">

                    {
                        list.map((item, index) => {
                            return(
                                <CardForum key={index} forum={item}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default ListForum;