import React from "react";
import "../../styles/components/form.css";

const Select = ({name, label, value, onChange, error = "", list, isId = false}) => {

    return(
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select name={name} id={name} value={value} onChange={onChange} className="form-control">
                {
                    list.map((item, index) => (
                        <option key={index} value={isId ? item.id : item}>{isId ? item.name : item}</option>
                    ))
                }
            </select>
            {error && <div className="form-alert alert-danger">{error}</div>}
        </div>
    )
}

export default Select;