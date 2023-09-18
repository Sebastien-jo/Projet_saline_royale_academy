import React, {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getCompositor} from "../../../api/endpoints/compositor";
import Input from "../../../components/form/input";
import Textarea from "../../../components/form/textarea";
import Button from "../../../components/button/button";
import Select from "../../../components/form/select";
import {getOeuvre} from "../../../api/endpoints/oeuvres";
import InputFile from "../../../components/form/inputFile";
import SubmitBtn from "../../../components/form/submitBtn";
import useCompositors from "../../../hooks/api/useCompositors";
import useCategories from "../../../hooks/api/useCategories";
import useOeuvres from "../../../hooks/api/useOeuvres";
import {useTranslation} from "react-i18next";


const FormOeuvre = ({title}) => {

    const { i18n, t } = useTranslation();


    const id = useParams().id;
    const [oeuvre, setOeuvre] = useState([]);

    const [name, setName] = useState(id ? oeuvre.name : "");
    const [composer, setComposer] = useState(id ? oeuvre.composer : "");
    const [category, setCategory] = useState(id ? oeuvre.category : "");
    const [description, setDescription] = useState(id ? oeuvre.description : "");
    const [audioPartition, setAudioPartition] = useState(id ? oeuvre.workAudio : "");
    const [partition, setPartition] = useState(id ? oeuvre.workScores : "");

    const fileInputRefAudio = useRef(null);
    const fileInputRefPartition = useRef(null);

    const navigate = useNavigate();

    //get compositors & categories
    const {loading: loadingCompositors, error: errorCompositors, handleGetAll : handleGetAllCompositors } = useCompositors();
    const {loading: loadingCategories, error: errorCategories, handleGetAll: handleGetAllCategories } = useCategories();
    const {handlePost} = useOeuvres();


    const [compositors, setCompositors] = useState([]);
    const [categories, setCategories] = useState([]);


    const handleFileChange = (e, {type}) => {
        if(type === "audio"){
            setAudioPartition(e.target.files[0]);
        }
        else if(type === "partition"){
            setPartition(e.target.files[0]);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const date = new Date();
        //form data
        const formData = new FormData();
        formData.append("name", name);
        formData.append("composer", `api/composers/${composer}`);
        formData.append("date", date.toISOString());
        formData.append("category", `api/categories/${category}`);
        formData.append("description", description);
        formData.append("workAudio", audioPartition);
        formData.append("workScores", partition);

        handlePost(formData).then((response) => {
            navigate("/oeuvres");
        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        if(id !== undefined){
            getOeuvre(id).then(response => {
                setOeuvre(response);
            }).catch(error => {
                console.log(error);
            });
        }

        handleGetAllCompositors().then((response) => {
            // Filter out items that are already in the listWorks
            const newItems = response.filter(element => !compositors.some(item => item.id === element.id));
            // Update the state only once with the new items
            setCompositors([...compositors, ...newItems]);
        }).catch((err) => {
            console.log(err);
        });

        handleGetAllCategories().then((response) => {
            // Filter out items that are already in the listWorks
            const newItems = response.filter(element => !categories.some(item => item.id === element.id));
            // Update the state only once with the new items
            setCategories([...categories, ...newItems]);
        }).catch((err) => {
            console.log(err);
        });
    }, []);


    return (
        <div className="main-container">
            <div className="main-content">
                <h2>{ t('admin.work.title') }</h2>
                <form onSubmit={handleSubmit} method="POST" enctype="multipart/form-data">
                    <div className={`form-first`}>

                        <Input type="text" name="name" label={ t('admin.work.form.name') } onChange={e => setName(e.target.value)} value={name}/>
                        <Select name="Composer" label={ t('admin.work.form.composer') } list={compositors !== [] ? compositors : [] } onChange={e => setComposer(e.target.value)} value={composer} isId={true}/>
                        <Select name="Category" label={ t('admin.work.form.category') } list={categories !== [] ? categories : []} onChange={e => setCategory(e.target.value)} value={category} isId={true}/>
                        <Textarea name="Description" label={ t('admin.work.form.description') } onChange={e => setDescription(e.target.value)} value={description}/>

                        <InputFile reference={fileInputRefAudio} name={"workAudio"} label={ t('admin.work.form.audio') } onChange={(e) => handleFileChange(e, {type: "audio"})} accept={".mp3"}/>
                        <InputFile reference={fileInputRefPartition} name={"workScores"} label={ t('admin.work.form.partition') } onChange={(e) => handleFileChange(e, {type: "partition"})} accept={".pdf, .jpg, .png"}/>


                        <SubmitBtn text={ t('bouton.add') } className={"red-full"}/>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormOeuvre;
