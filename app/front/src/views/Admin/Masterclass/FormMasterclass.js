import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Input from "../../../components/form/input";
import Select from "../../../components/form/select";
import Button from "../../../components/button/button";
import {getMasterclass} from "../../../api/endpoints/masterclass";
import SectionMasterclass from "../../../components/form/masterclass/sectionMasterclass";
import "../../../styles/masterclass.css";
import useOeuvres from "../../../hooks/api/useOeuvres";
import useMasterclass from "../../../hooks/api/useMasterclass";
import SubmitBtn from "../../../components/form/submitBtn";
import plus from "../../../assets/icones/icon-add-White.svg";

const FormMasterclass = ({text}) => {

    const id = useParams().id;
    const [masterclass, setMasterclass] = useState([]);

    const [name, setName] = useState(id ? masterclass.name : "");
    const [composer, setComposer] = useState(id ? masterclass.composer : "");
    const [work, setWork] = useState(id ? masterclass.work : "");
    const [lessonVideo, setLessonVideo] = useState(id ? masterclass.lessonVideo : "");
    const [sectionsContent, setSectionsContent] = useState(id ? masterclass.sectionsContent : {});
    const [nbSections, setNbSections] = useState(id ? masterclass.nbSections : 1);

    const [masterclassContent, setMasterclassContent] = useState({});
    const [listWorks, setListWorks] = useState([]);

    const {loading, error, handleGetAll} = useOeuvres();
    const {handlePost} = useMasterclass();

    const [activeChapter, setActiveChapter] = useState(0);


    useEffect(() => {
        if(id !== undefined){
            getMasterclass(id).then(response => {
                setMasterclass(response);
            }).catch(error => {
                console.log(error);
            });
        }
    }, [id]);

    useEffect(() => {
        handleGetAll()
            .then((response) => {
                // Filter out items that are already in the listWorks
                const newItems = response.filter(element => !listWorks.some(item => item.id === element.id));
                // Update the state only once with the new items
                setListWorks([...listWorks, ...newItems]);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        handlePost(masterclassContent).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        setMasterclassContent({
            name: name,
            work: `api/works/${work}`,
            sectionsContent: sectionsContent
        })
    }, [name, work, sectionsContent]);

    return (
        <div className="main-container">
            <div className="main-content">
                <h2>{ text }</h2>
                <form onSubmit={handleSubmit} method="POST">
                    <div className={`form-row`}>
                        <div className={`form-first masterclassForm`}>
                            <Input type="text" name="name" label="Nom de la masterclass" onChange={e => setName(e.target.value)} value={name}/>
                            <Select name="work" label="Oeuvres" list={listWorks ? listWorks : [] } onChange={e => setWork(e.target.value)} value={work} isId={true} />
                        </div>

                        <div className={`form-col form-second masterclassForm`}>

                            {
                                Array.from(Array(nbSections), (_, index) => (

                                    <div className={`section-container ${index === activeChapter ? 'active' : ''}`} key={index} onClick={() => setActiveChapter(index)}>
                                        <h3>Chapitre { index + 1 }</h3>
                                        <div className="section-lesson-list">
                                            <SectionMasterclass index={index + 1} sectionsContent={sectionsContent} setSectionsContent={setSectionsContent} />
                                        </div>
                                    </div>
                                ))
                            }

                            <Button text="Ajouter un chapitre" className={"red-full"} isIcon={true} icon={plus} click={() => setNbSections(nbSections + 1)} />
                        </div>
                    </div>



                   <SubmitBtn text="Ajouter" className={"red-full"} icon={"add"} />

                </form>
            </div>
        </div>
    );
}

export default FormMasterclass;
