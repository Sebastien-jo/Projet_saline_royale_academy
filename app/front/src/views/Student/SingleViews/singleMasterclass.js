import React, {useState, useEffect} from "react";
import Button from "../../../components/button/button";
import VideoPlayer from "../../../components/video/videoPlayer";
import "../../../styles/singleMasterclass.css";
import {useParams} from "react-router-dom";
import useMasterclass from "../../../hooks/api/useMasterclass";
import CardSection from "../../../components/card/masterclass/cardSection";
import SidebarChapter from "../../../components/sidebar/Masterclass/sidebarChapter";
import useMasterclassUser from "../../../hooks/api/useMasterclassUser";

const SingleMasterclass = () => {

    const {id} = useParams();
    const [masterclass, setMasterclass] = useState(false);
    const [chapter, setChapter] = useState([]); // [state, function to update state
    const [isOpen, setIsOpen] = useState(false);
    const {loading, error, handleGet} = useMasterclassUser();

    useEffect(() => {
        handleGet(id).then((response) => {
            setMasterclass(response);
            console.log("masterclass", response);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <div className="main-container">
            <div className="main-content isSidebar">

                <div className="masterclass-container">
                    <h2 className="masterclass-title">Masterclass: {masterclass.masterclass ? masterclass.masterclass.name : "Masterclass"}</h2>
                    <div className="masterclass-chapter-list">
                        {
                            masterclass ?
                                masterclass.sectionUsers.map((item, index) => {
                                    return <CardSection chapter={item} key={index} setChapter={setChapter} setIsOpen={setIsOpen}/>
                                })
                            : null
                        }
                    </div>
                </div>
            </div>
            {
                isOpen ? <SidebarChapter key={masterclass.id} chapter={chapter} setChapter={setChapter} idMasterclass={masterclass.id}/> : null
            }
        </div>
    );
}

export default SingleMasterclass;