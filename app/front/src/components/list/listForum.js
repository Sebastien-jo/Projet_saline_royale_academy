import React, {useEffect, useState} from 'react';
import FiltersCard from "../filters/filtersCard";
import CardForum from "../card/forum/cardForum";
import Button from "../button/button";
import useForum from "../../hooks/api/useForum";


const ListForum = ({text, setSidebar, setActiveSidebar}) => {

    const [forums, setForums] = useState([]); // [state, function to update state
    const {loading, error, handleGetAll} = useForum()
    const [refresh, setRefresh] = useState(false); // [state, function to update state
    const [selectedForumId, setSelectedForumId] = useState(null);

    const handleForumSelect = (forumId) => {
        setSelectedForumId(forumId);
    };

    useEffect(() => {
        handleGetAll().then((response) => {
            setForums(response);
        }).catch((err) => {
            console.log(err);
        });
    }, [refresh]);

    return (
        <div className="container-forum">
            <div className="forum-row">
                <div className="container__header">
                    <Button text={"Poser une question"} className={"red-full"} isArrow={true} click={() => setActiveSidebar("addForum")} />
                    <FiltersCard/>
                </div>

                <div className="container-forum__content">

                    {
                        forums.map((item, index) => {
                            return(
                                <CardForum key={index} forum={item} setSidebar={setSidebar} handleSelect={() => handleForumSelect(item.id)} isSelected={selectedForumId === item.id} setActiveSidebar={setActiveSidebar} setRefresh={setRefresh} refresh={refresh}/>
                            )
                        }).reverse()
                    }
                </div>
            </div>
        </div>
    );
}

export default ListForum;