import React from "react";
import "../../styles/components/form.css";

const Input = ({ name, label, type = "text", error, ...rest }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input {...rest} name={name} id={name} type={type} className="form-control" />
            {error && <div className="form-alert alert-danger">{error}</div>}
        </div>
    );
}

export default Input;