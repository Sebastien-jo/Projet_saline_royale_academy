import React from 'react';
import CardLesson from "../../card/masterclass/cardLesson";
import Pastille from "../../pastille/pastille";
import Button from "../../button/button";

const sidebarChapter = ({chapter, setChapter}) => {

    return(
        <div className="sidebar">
            <div className="lesson_row_header">
                <div className={"lesson_row"}>
                    <div className="lesson_icon"></div>
                    <div className="lesson_title">Chapitre 1: {chapter.name}</div>
                </div>
               <div className="lesson_nb">2/5</div>
            </div>
            <div className="sidebar__content">
                <div className="sidebar__content lesson_accordion_content">
                    <div className={"lesson_container"}>
                    {
                        chapter.lessons.map((item, index) => {
                            return <CardLesson key={index} lesson={item} setChapter={setChapter}/>
                        })
                    }
                    </div>
                    <Button text={"Commencer"} link={"#/masterclass/1"} className={"btn red-full"}/>
                </div>
            </div>
        </div>
    )
}

export default sidebarChapter;