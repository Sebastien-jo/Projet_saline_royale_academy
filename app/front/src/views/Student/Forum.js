import React, {useState, useEffect} from 'react';
import ListForum from "../../components/list/listForum";
import SidebarForum from "../../components/sidebar/Forum/sidebarForum";
import "../../styles/forum.css";
import useSidebarContent from "../../hooks/useSidebarContent";
import useForum from "../../hooks/api/useForum";
import SidebarForumAdd from "../../components/sidebar/Forum/sidebarForumAdd";

const Forum = () => {

    const { sidebarContent, updateSidebarContent, clearSidebarContent } = useSidebarContent();
    const [sidebar, setSidebar] = useState(false);
    const [activeSidebar, setActiveSidebar] = useState("");



    return (
        <div className="main-container">
            <div className="main-content">
               <ListForum setSidebar={setSidebar} setActiveSidebar={setActiveSidebar}/>
            </div>

            { activeSidebar === "addForum" ? <SidebarForumAdd /> : null }
            { activeSidebar === "forum" ? <SidebarForum content={sidebarContent} clearSidebarContent={clearSidebarContent} isSideBar={sidebar}/> : null }
        </div>
    );
}

export default Forum;
