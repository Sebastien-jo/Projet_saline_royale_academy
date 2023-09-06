import React, {useState, useEffect} from 'react';
import ListForum from "../../../components/list/listForum";
import SidebarForum from "../../../components/sidebar/Forum/sidebarForum";
import "../../../styles/forum.css";
import useSidebarContent from "../../../hooks/useSidebarContent";
import useForum from "../../../hooks/api/useForum";
import SidebarForumAdd from "../../../components/sidebar/Forum/sidebarForumAdd";
import MenuBar from "../../../components/navbar/MenuBar";

const Forum = () => {

    const { sidebarContent, updateSidebarContent, clearSidebarContent } = useSidebarContent();
    const [sidebar, setSidebar] = useState(false);
    const [activeSidebar, setActiveSidebar] = useState("");


    const closeSidebar = () => {
        setSidebar(false);
        setActiveSidebar("");
    }

    return (
        <div className="main-container">
            <div className="main-content isSidebar">
                <MenuBar items={[
                    {
                        name: "Forum",
                        link: "/forum",
                        isLinkActive: true,
                    },
                    {
                        name: "Mes questions",
                        link: "/forum/myforum",
                        isLinkActive: false,
                    }
                    ]}/>


               <ListForum setSidebar={setSidebar} setActiveSidebar={setActiveSidebar}/>
            </div>

            { activeSidebar === "addForum" ? <SidebarForumAdd closeSidebar={closeSidebar} /> : null }
            { activeSidebar === "forum" ? <SidebarForum content={sidebarContent} clearSidebarContent={clearSidebarContent} isSideBar={sidebar} closeSidebar={closeSidebar} /> : null }
        </div>
    );
}

export default Forum;
