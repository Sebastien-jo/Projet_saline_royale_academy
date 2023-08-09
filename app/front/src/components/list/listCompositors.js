import React, {useEffect, useState} from 'react';
import CardColumn from "../card/cardColumn";
import FiltersCard from "../filters/filtersCard";
import useCompositors from "../../hooks/api/useCompositors";

const ListCompositors = ({list}) => {

    const [compositors, setCompositors] = useState([]); // [state, function to update state
    const {loading, error, handleGetAll} = useCompositors();

    useEffect(() => {
        handleGetAll().then((response) => {
            setCompositors(response);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        <div className="container-list">
            <div className="list-row">
                <div className="container__header">
                    <h2>Récemment ajoutés</h2>
                    <FiltersCard/>
                </div>

                <div className="container-list__content">

                    {
                        compositors.map((item, index) => {
                            return(
                                <CardColumn key={index} image={item.picture} title={item.name} subtitle={item.birth} description={item.description} link={`#/compositeurs/${item.id}`}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default ListCompositors;