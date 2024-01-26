import React from "react";
import { string } from "prop-types";
import classNames from "classnames";

const FormButton = (props) => {
    const {
        label,
        className
    } = props;
    return (
        <button className={classNames(
            "bg-primary-500 text-sm font-bold h-12.5 text-white w-full shadow-btn text-center hover_bg-primary-600 transition-all duration-md",
            className
        )}>
            {label}
        </button>
    )
}
export default FormButton;
FormButton.propTypes = {
    label: string.isRequired,
    className: string
}