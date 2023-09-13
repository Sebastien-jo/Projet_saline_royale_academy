import React, { useRef, useState } from "react";
import "../../styles/components/form.css";
import file from "../../assets/icones/icon-upload-Blue-stroke.svg";
import {useTranslation} from "react-i18next";

const InputFile = ({ name, label, onChange, accept }) => {
    const fileInputRef = useRef(null);
    const [previewImage, setPreviewImage] = useState(null);

    const { i18n, t } = useTranslation();

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];

        console.log(selectedFile);

        if (selectedFile) {
            if (selectedFile.type === "application/pdf") {
                // Handle PDF file
                setPreviewImage("#"); // Replace with actual path
            } else if (selectedFile.type.startsWith("audio")) {
                // Handle audio file (MP3 or other)
                setPreviewImage("#"); // Replace with actual path
            } else {
                // Handle other file types
                const reader = new FileReader();
                reader.onload = () => {
                    setPreviewImage(reader.result);
                };
                reader.readAsDataURL(selectedFile);
            }
        } else {
            setPreviewImage(null);
        }

        if (onChange) {
            onChange(event);
        }
    };

    const clearPreview = () => {
        setPreviewImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className={`form-group`}>
            <div className="file-body">
                <h2 className="file-title">{ label }</h2>
                <p className="file-description">{ t('fileImage.title') }</p>
                <button className="upload-area">
                    {
                        previewImage ?
                            <>
                                <div className="file-footer">
                                    <button className="btn-secondary" onClick={clearPreview}>
                                        { t('fileImage.erase') }
                                    </button>
                                    <button className="btn-secondary" onClick={() => fileInputRef.current.click()}>
                                        { t('fileImage.change') }
                                    </button>
                                </div>

                                <div className="file-preview">
                                    <img src={previewImage} alt="Preview" />
                                </div>
                            </>
                        :
                        <>
                            <span className="upload-area-icon">
                                <img src={file} alt="file" />
                            </span>
                            <span className="upload-area-title">{ t('fileImage.subtitle') }</span>
                            <span className="upload-area-description">
                                { t('fileImage.restriction') }
                            </span>
                            <input
                                name={name}
                                id={name}
                                type={'file'}
                                accept={accept}
                                className="form-control"
                                onChange={handleFileChange}
                                ref={fileInputRef}
                            />
                        </>
                    }
                </button>
            </div>

        </div>
    );
};

export default InputFile;
