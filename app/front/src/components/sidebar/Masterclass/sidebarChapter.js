import React from 'react';
import CardLesson from "../../card/masterclass/cardLesson";
import Pastille from "../../pastille/pastille";
import Button from "../../button/button";
import {Link} from "react-router-dom";

const sidebarChapter = ({chapter, setChapter, idMasterclass}) => {


    return(
        <div className="sidebar">
            <div className="lesson_row_header">
                <div className={"lesson_row"}>
                    <div className="lesson_icon"></div>
                    <div className="lesson_title">Chapitre 1: {chapter.name}</div>
                </div>
               <div className="lesson_nb">0/{chapter.lessons ? chapter.lessons.length : 0}</div>
            </div>
            <div className="sidebar__content">
                <div className="sidebar__content lesson_accordion_content">
                    <div className={"lesson_container"}>
                    {
                        chapter.lessons && chapter.lessons.map((item, index) => {
                            return <CardLesson key={index} lesson={item} setChapter={setChapter}/>
                        })
                    }
                    </div>
                    {/*<Button text={"Commencer"} link={`#/masterclass/${idMasterclass}/chapter`} className={"btn btn-primary btn-lg btn-block"} params={chapter}/>*/}
{/*
                    <Link to={`/masterclass/${idMasterclass}/chapter`} params={{chapter: chapterObjectString}} className={"btn btn-primary btn-lg btn-block"}>Commencer</Link>
*/}

                    <Link to={`/masterclass/${idMasterclass}/chapter`} state={{chapter: chapter, id: idMasterclass}} className={"btn btn-primary btn-lg btn-block"}>Commencer</Link>
                </div>
            </div>
        </div>
    )
}

export default sidebarChapter;