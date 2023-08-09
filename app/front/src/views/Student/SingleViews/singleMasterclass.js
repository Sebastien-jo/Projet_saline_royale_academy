import React, {useState, useEffect} from "react";
import Button from "../../../components/button/button";
import VideoPlayer from "../../../components/video/videoPlayer";
import "../../../styles/singleMasterclass.css";
import {useParams} from "react-router-dom";
import useMasterclass from "../../../hooks/api/useMasterclass";
import CardSection from "../../../components/card/masterclass/cardSection";
import SidebarChapter from "../../../components/sidebar/Masterclass/sidebarChapter";

const SingleMasterclass = () => {

    const {id} = useParams();
    const [masterclass, setMasterclass] = useState(false);
    const [chapter, setChapter] = useState([]); // [state, function to update state
    const [isOpen, setIsOpen] = useState(false);
    const {loading, error, handleGet } = useMasterclass();

    useEffect(() => {
        handleGet(id).then((response) => {
            setMasterclass(response);
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <div className="main-container">
            <div className="main-content isSidebar">

                <div className="masterclass-container">
                    <h2 className="masterclass-title">Masterclass: {masterclass.name}</h2>
                    <div className="masterclass-chapter-list">

                        {
                            masterclass ?
                                masterclass.sections.map((item, index) => {
                                    return <CardSection chapter={item} key={index} setChapter={setChapter} setIsOpen={setIsOpen}/>
                                })
                            : null
                        }
                    </div>
                </div>
            </div>
            {
                isOpen ? <SidebarChapter key={masterclass.id} chapter={chapter} setChapter={setChapter}/> : null
            }
        </div>
    );
}

export default SingleMasterclass;