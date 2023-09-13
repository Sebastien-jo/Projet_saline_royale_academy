import React, {useEffect, useState} from 'react';
import FiltersModal from "../filters/filtersModal";
import CardForum from "../card/forum/cardForum";
import Button from "../button/button";
import useForum from "../../hooks/api/useForum";
import Loader from "../loader/loader";
import SortModal from "../filters/sortModal";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
const ListForum = ({text, setSidebar, setActiveSidebar, myforum = false }) => {

    const [forums, setForums] = useState(false); // [state, function to update state
    const {loading, error, handleGetAll, handleGetByUser} = useForum();
    const [refresh, setRefresh] = useState(false); // [state, function to update state
    const [selectedForumId, setSelectedForumId] = useState(null);
    const [sortedList, setSortedList] = useState(false);

    const user = useSelector(state => state.auth.user);
    const { i18n, t } = useTranslation();

    const handleForumSelect = (forumId) => {
        setSelectedForumId(forumId);
    };

    useEffect(() => {
        forums.length > 0 ? setSortedList(forums) : setSortedList(false);
    }, [forums]);

    useEffect(() => {
        !myforum ?
            handleGetAll().then((response) => {
                setForums(response);
            }).catch((err) => {
                console.log(err);
            })
            :
            handleGetByUser(user.id).then((response) => {
                setForums(response);
            }).catch((err) => {
                console.log(err);
            })
    }, [refresh]);

    return (
        <div className="container-forum">
            <div className="forum-row">
                <div className="container__header">
                    <Button text={ t('forum.bouton_add') } className={"red-full"} isArrow={true} click={() => setActiveSidebar("addForum")} />
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
                            :
                            <p>{ t('forum.forum_no_data') }</p>
                    }
                </div>
            </div>
        </div>
    );
}

export default ListForum;