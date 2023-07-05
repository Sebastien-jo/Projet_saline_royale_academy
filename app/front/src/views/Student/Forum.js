import React from 'react';
import ListForum from "../../components/list/listForum";
import SidebarForum from "../../components/sidebar/sidebarForum";
import "../../styles/forum.css";



const Forum = () => {
    const test = [1,2,3,4,5];

    return (
        <div className="main-container">
            <div className="main-content">

               <ListForum/>


            </div>

            <SidebarForum/>
        </div>
    );
}

export default Forum;
