import React, {useState} from 'react';
import useSidebarContent from "../../../hooks/useSidebarContent";
import ListForum from "../../../components/list/listForum";
import SidebarForumAdd from "../../../components/sidebar/Forum/sidebarForumAdd";
import SidebarForum from "../../../components/sidebar/Forum/sidebarForum";
import MenuBar from "../../../components/navbar/MenuBar";

const MyForum = () => {
    const { sidebarContent, updateSidebarContent, clearSidebarContent } = useSidebarContent();
    const [sidebar, setSidebar] = useState(false);
    const [activeSidebar, setActiveSidebar] = useState("");


    const closeSidebar = () => {
        setSidebar(false);
        setActiveSidebar("");
    }

    return (
        <div className="main-container">
            <div className="main-content isSidebar menuTabs">
                <MenuBar items={[
                    {
                        name: "Forum",
                        link: "/forum",
                        isLinkActive: false,
                    },
                    {
                        name: "Mes questions",
                        link: "/forum/myforum",
                        isLinkActive: true,
                    }
                ]}/>


                <ListForum setSidebar={setSidebar} setActiveSidebar={setActiveSidebar} myforum={true} />
            </div>

            { activeSidebar === "addForum" ? <SidebarForumAdd closeSidebar={closeSidebar} /> : null }
            { activeSidebar === "forum" ? <SidebarForum content={sidebarContent} clearSidebarContent={clearSidebarContent} isSideBar={sidebar} closeSidebar={closeSidebar} /> : null }
        </div>
    );
}

export default MyForum;