import React, {useState, useEffect} from 'react';
import ListForum from "../../components/list/listForum";
import SidebarForum from "../../components/sidebar/sidebarForum";
import "../../styles/forum.css";
import useSidebarContent from "../../hooks/useSidebarContent";
import useForum from "../../hooks/useForum";

const Forum = () => {

    const [forums, setForums] = useState([]); // [state, function to update state
    const {loading, error, handleGetAll} = useForum();
    const { sidebarContent, updateSidebarContent, clearSidebarContent } = useSidebarContent();


    useEffect(() => {
        handleGetAll().then((response) => {
            console.log(response);
            setForums(response);
        }).catch((err) => {
            console.log(err);
        });
    }, []);


    return (
        <div className="main-container">
            <div className="main-content">
               <ListForum list={forums}/>
            </div>

            <SidebarForum content={sidebarContent} clearSidebarContent={clearSidebarContent}/>
        </div>
    );
}

export default Forum;
