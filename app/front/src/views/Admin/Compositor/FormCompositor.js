import React, {useEffect, useRef, useState} from "react";
import Input from "../../../components/form/input";
import Button from "../../../components/button/button";
import Textarea from "../../../components/form/textarea";
import {useParams} from "react-router-dom";
import {getCompositor} from "../../../api/endpoints/compositor";
import useCompositors from "../../../hooks/api/useCompositors";
import InputFile from "../../../components/form/inputFile";
import useCategories from "../../../hooks/api/useCategories";
import Select from "../../../components/form/select";
import {useNavigate} from "react-router-dom";
import SubmitBtn from "../../../components/form/submitBtn";
import {useTranslation} from "react-i18next";


const FormCompositor = ({title}) => {

    const { i18n, t } = useTranslation();


        const id = useParams().id;

        const [name, setName] = useState("");
        const [dateOfBirth, setDateOfBirth] = useState("");
        const [dateOfDeath, setDateOfDeath] = useState("");
        const [completeName, setCompleteName] = useState("");
        const [category, setCategory] = useState(id ? composer.categories : "");
        const [description, setDescription] = useState("");
        const [nationality, setNationality] = useState("");
        const languageNames = [
        'Française',
        'English',
        'Español',
        'Deutsch',
        'Italiano',
        'Português',
        'Nederlands',
        'Polski',
        'Русский',
        '中文',
        'العربية',
        '日本語',
        '한국어',
        'Türkçe',
        'ไทย',
        'Tiếng Việt',
        'Bahasa Indonesia',
        'Română',
        'Čeština',
        'Magyar',
        'Svenska',
        'Dansk',
        'Suomi',
        'Norsk',
        'Ελληνικά',
        'עברית',
        'हिन्दी',
        'Български',
        'Українська',
        'Slovenčina',
        'Slovenščina',
        'Hrvatski',
        'Lietuvių',
        'Latviešu',
        'Eesti',
        'Srpski',
        'Bahasa Melayu',
        'فارسی',
        'Kiswahili',
        'Afrikaans',
        'Shqip',
        'Հայերեն',
        'Azərbaycanca',
        'Беларуская',
        'Bosanski',
        'ქართული',
        'Македонски',
        'Монгол',
        'नेपाली',
        'پښتو',
        'Srpski (latinica)',
        'Kiswahili (latinica)',
        'தமிழ்',
        'తెలుగు',
        '中文（简体）',
        '中文（繁體）',
        '中文（台灣）',
        '中文（香港）'
    ];
        const fileInputRef = useRef(null); // Ref to the file input element
        const [file, setFile] = useState(); // State to store the selected file


    const [compositor, setCompositor] = useState([]);
        const {loading, error, handlePost, handleAddCompositorImage } = useCompositors();

        const {loading: loadingCategories, error: errorCategories, handleGetAll: handleGetAllCategories } = useCategories();
        const [categories, setCategories] = useState([]);

        const naviguate = useNavigate();



    useEffect(() => {
            if(id !== undefined){
                const data = {
                    name: name,
                    completeName: completeName,
                    description: description,
                    birth: dateOfBirth,
                    death: dateOfDeath,
                    nationality: nationality
                }
                handlePost(id).then((response) => {
                   setCompositor(response);
                }).catch((error) => {
                    console.log(error);
                });

            }
        }, [id]);

        useEffect(() => {
            handleGetAllCategories().then((response) => {
                // Filter out items that are already in the listWorks
                const newItems = response.filter(element => !categories.some(item => item.id === element.id));
                // Update the state only once with the new items
                setCategories([...categories, ...newItems]);
            }).catch((err) => {
                console.log(err);
            });
        }, []);

        const handleFileChange = (e) => {
            setFile(e.target.files[0]); // Access the file object and update the state
        }


        const handleSubmit = (event) => {
            event.preventDefault();
            const data = {
                name: name,
                completeName: completeName,
                description: description,
                birth: dateOfBirth,
                death: dateOfDeath,
                nationality: nationality
            }

            handlePost(data).then((response) => {
                const formData = new FormData();
                formData.append("file", file); // Append the selected file to the FormData
                formData.append("composer", response.id); // Append the selected file to the FormData

                handleAddCompositorImage(formData).then((response) => {
                    console.log(response);
                }).then((error) => {
                    naviguate("/compositeurs");
                }).catch((error) => {
                    console.log(error);
                });
            }).catch((error) => {
                console.log(error);
            });
        }

        return (
            <div className="main-container">
                <div className="main-content">
                    <h2>{ t('admin.composer.title') }</h2>
                    <form onSubmit={handleSubmit} method="POST">

                        <div className={`form-first`}>
                            <div className={"form-row"}>
                                <Input type="text" name="name" label={ t('admin.composer.form.name') } onChange={e => setName(e.target.value)} value={name}/>
                                <Input type="text" name="completeName" label={ t('admin.composer.form.complete_name') } onChange={e => setCompleteName(e.target.value)} value={completeName}/>
                            </div>
                           <div className={"form-row"}>
                                <Input type="date" name="DateOfBirth" label={ t('admin.composer.form.birth') } onChange={e => setDateOfBirth(e.target.value)} value={dateOfBirth}/>
                                <Input type="date" name="DateOfDeath" label={ t('admin.composer.form.death') } onChange={e => setDateOfDeath(e.target.value)} value={dateOfDeath}/>
                            </div>
                            <div className={"form-row"}>
                                <Select name="Category" label={ t('admin.composer.form.category') } list={categories !== [] ? categories : []} onChange={e => setCategory(e.target.value)} value={category} isId={true}/>
                                <Select name="nationality" label={ t('admin.composer.form.nationality') } list={languageNames} onChange={e => setNationality(e.target.value)} value={nationality} isId={false} />
                            </div>
                            <Textarea name="Description" label={ t('admin.composer.form.description') } onChange={e => setDescription(e.target.value)} value={description}/>


                            <InputFile reference={fileInputRef} name="file" label={ t('admin.composer.form.image') } onChange={handleFileChange} accept="image/*" />

                            <SubmitBtn ttext={ t('bouton.add') } className={"red-full"} />
                        </div>
                    </form>
                </div>
            </div>
        );
}

export default FormCompositor;