import React,{ useState} from 'react';
import Accordion from "../../accordion/accordion";
import CardLesson from "./cardLesson";
import RoundProgress from "../../progress/progressRound";
import Button from "../../button/button";

const cardSection = ({chapter, setChapter, setIsOpen, key}) => {

    const handleToggle = () => {
        setIsOpen(true);
        setChapter(chapter);
    };


    return(
        <div className="chapter-item">
            <div className="chapter-list__lesson__progress">
                <RoundProgress progress={30} />
            </div>
            <div className="chapter-list__content">
                <h2>Chapitre:  { chapter.infoSection.name }</h2>
                <p>{  chapter.description }</p>

                <Button text={"Voir les leçons"} className={"btn btn--primary"} click={handleToggle}/>
            </div>
        </div>
    )

}

export default cardSection;
