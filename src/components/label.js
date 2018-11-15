import React from 'react';

import '../styles/label.css';

const Label = (props) => {
    return (
        <span className="label">
            #{props.text}
        </span>
    );
};

export default Label;