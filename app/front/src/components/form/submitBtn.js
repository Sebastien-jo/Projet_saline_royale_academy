import React from 'react';

const SubmitBtn = ({text, className, icon, ...rest}) => {
    return (
        <input {...rest} className={`btn-submit ${className} ${icon}`} type="submit" value={text}/>
    );
}

export default SubmitBtn;