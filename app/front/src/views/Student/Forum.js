import React, {useState, useEffect} from 'react';
import ListForum from "../../components/list/listForum";
import SidebarForum from "../../components/sidebar/Forum/sidebarForum";
import "../../styles/forum.css";
import useSidebarContent from "../../hooks/useSidebarContent";
import useForum from "../../hooks/useForum";
import SidebarForumAdd from "../../components/sidebar/Forum/sidebarForumAdd";

const Forum = () => {

    const [forums, setForums] = useState([]); // [state, function to update state
    const {loading, error, handleGetAll} = useForum();
    const { sidebarContent, updateSidebarContent, clearSidebarContent } = useSidebarContent();

    const [sidebar, setSidebar] = useState(false);

    const [activeSidebar, setActiveSidebar] = useState("");


    useEffect(() => {
        handleGetAll().then((response) => {
            setForums(response);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    console.log(activeSidebar);

    return (
        <div className="main-container">
            <div className="main-content">
               <ListForum list={forums} setSidebar={setSidebar} setActiveSidebar={setActiveSidebar}/>
            </div>

            { activeSidebar === "addForum" ? <SidebarForumAdd /> : null }
            { activeSidebar === "forum" ? <SidebarForum content={sidebarContent} clearSidebarContent={clearSidebarContent} isSideBar={sidebar}/> : null }
        </div>
    );
}

export default Forum;
