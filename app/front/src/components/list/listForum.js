import React, {useEffect, useState} from 'react';
import FiltersModal from "../filters/filtersModal";
import CardForum from "../card/forum/cardForum";
import Button from "../button/button";
import useForum from "../../hooks/api/useForum";
import Loader from "../loader/loader";
import SortModal from "../filters/sortModal";
import {useSelector} from "react-redux";
const ListForum = ({text, setSidebar, setActiveSidebar, myforum = false }) => {

    const [forums, setForums] = useState(false); // [state, function to update state
    const {loading, error, handleGetAll, handleGet } = useForum();
    const [refresh, setRefresh] = useState(false); // [state, function to update state
    const [selectedForumId, setSelectedForumId] = useState(null);
    const [sortedList, setSortedList] = useState([]);

    const user = useSelector(state => state.auth.user);


    const handleForumSelect = (forumId) => {
        setSelectedForumId(forumId);
    };

    useEffect(() => {
        setSortedList(forums);
    }, [forums]);

    useEffect(() => {
        !myforum ?
            handleGetAll().then((response) => {
                setForums(response);
                console.log(response);
            }).catch((err) => {
                console.log(err);
            })
            :
            handleGet(user.id).then((response) => {
                setForums(response);
            }).catch((err) => {
                console.log(err);
            })
    }, [refresh]);

    return (
        <div className="container-forum">
            <div className="forum-row">
                <div className="container__header">
                    <Button text={"Poser une question"} className={"red-full"} isArrow={true} click={() => setActiveSidebar("addForum")} />
                    <SortModal list={forums} setSortedList={setForums} />
                </div>

                <div className="container-forum__content">

                    {
                        sortedList ?
                            sortedList.map((item, index) => {
                                return(
                                    <CardForum
                                        key={index}
                                        forum={item}
                                        setSidebar={setSidebar}
                                        handleSelect={() => handleForumSelect(item.id)}
                                        isSelected={selectedForumId === item.id}
                                        setActiveSidebar={setActiveSidebar}
                                        setRefresh={setRefresh}
                                        refresh={refresh}/>
                                )
                            })
                            : <Loader />
                    }
                </div>
            </div>
        </div>
    );
}

export default ListForum;