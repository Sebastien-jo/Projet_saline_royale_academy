import React from "react";
import "../../styles/components/form.css";

const Textarea = ({ name, label, error, ...rest }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <textarea {...rest} name={name} id={name} className="form-control" />
            {error && <div className="form-alert alert-danger">{error}</div>}
        </div>
    );
}

export default Textarea;