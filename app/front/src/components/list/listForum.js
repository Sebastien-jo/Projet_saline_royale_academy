import React, {useState} from 'react';
import FiltersCard from "../filters/filtersCard";
import CardForum from "../card/cardForum";
import Button from "../button/button";


const ListForum = ({text, list, setSidebar, setActiveSidebar}) => {

    const [selectedForumId, setSelectedForumId] = useState(null);

    const handleForumSelect = (forumId) => {
        setSelectedForumId(forumId);
    };

    return (
        <div className="container-forum">
            <div className="forum-row">
                <div className="container__header">
                    <Button text={"Poser une question"} className={"red-full"} isArrow={true} click={() => setActiveSidebar("addForum")} />
                    <FiltersCard/>
                </div>

                <div className="container-forum__content">

                    {
                        list.map((item, index) => {
                            return(
                                <CardForum key={index} forum={item} setSidebar={setSidebar} handleSelect={() => handleForumSelect(item.id)} isSelected={selectedForumId === item.id} setActiveSidebar={setActiveSidebar}/>
                            )
                        }).reverse()
                    }
                </div>
            </div>
        </div>
    );
}

export default ListForum;