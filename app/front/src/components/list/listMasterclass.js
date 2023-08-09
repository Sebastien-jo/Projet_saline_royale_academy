import React, {useState, useEffect} from 'react';
import CardColumn from "../card/cardColumn";
import FiltersCard from "../filters/filtersCard";
import useMasterclassUser from "../../hooks/api/useMasterclassUser";

const ListMasterclass = ({list}) => {

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
        <div className="container-list">
            <div className="list-row">
                <div className="container__header">
                    <h2>Récemment ajoutés</h2>
                    <FiltersCard/>
                </div>

                <div className="container-list__content">

                    {
                        masterclass ?
                            masterclass.map((item, index) => {
                                return(
                                    <CardColumn key={index} image={"https://picsum.photos/200/300"} title={item.masterclass.name} description={""} link={"#/masterclass/" + item.id} />
                                )
                        })
                        : null
                    }
                </div>
            </div>
        </div>
    );
}

export default ListMasterclass;