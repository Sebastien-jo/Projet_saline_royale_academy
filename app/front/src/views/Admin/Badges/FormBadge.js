import React, {useEffect, useState, useRef} from 'react';
import Button from "../../../components/button/button";
import Input from "../../../components/form/input";
import Textarea from "../../../components/form/textarea";
import {getBadge} from "../../../api/endpoints/badge";
import {useParams} from "react-router-dom";
import useBadges from "../../../hooks/api/useBadges";
import SubmitBtn from "../../../components/form/submitBtn";
import InputFile from "../../../components/form/inputFile";
import {useNavigate} from "react-router-dom";

const FormBadge = ({title}) => {

    const id = parseInt(useParams().id);
    const [badge, setBadge] = useState([]);

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [name, setName] = useState(id ? badge.name : "");
    const [description, setDescription] = useState(id ? badge.description : "");
    const fileInputRef = useRef(null); // Ref to the file input element
    const [file, setFile] = useState(); // State to store the selected file

    const { loading, error, handlePost, handleAddBadgeImage } = useBadges();

    useEffect(() => {
        if(isNaN(id) === false){
            getBadge(id).then((response) => {
                setBadge(response);
                setFile(response.image);
                setName(response.name);
                setDescription(response.description);
            }).catch((error) => {
                console.log(error);
            });
        }
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Access the file object and update the state
    }

    const handleSubmit = (e) => {

        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file); // Append the selected file to the FormData
        formData.append("badge", 2); // Append the selected file to the FormData

      const data = {
            "category": name
       }
        handlePost(data).then((response) => {
          console.log(response);
          const formData = new FormData();
          formData.append("file", file); // Append the selected file to the FormData
          formData.append("badge", response.id); // Append the selected file to the FormData

            for (const pair of formData.entries()) {
                console.log(pair[0], pair[1]);
            }
            handleAddBadgeImage(formData).then((response) => {
                console.log(response);
            }).then((error) => {
                navigate("/badges");
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
                <h2>{ title }</h2>
                <form onSubmit={handleSubmit} method="POST">
                    <div className={`form-first`}>
                        <Input name="name" label="Nom" type="text" value={name} onChange={e => setName(e.target.value)} />
                        <Textarea name="description" label="Description" value={description} type="text" onChange={e => setDescription(e.target.value)} />
                        <InputFile reference={fileInputRef} name="file" label="Image" onChange={handleFileChange} accept="image/*" />
                    </div>
                    <SubmitBtn title={"Ajouter"} />
                </form>
            </div>
        </div>
    );
}

export default FormBadge;