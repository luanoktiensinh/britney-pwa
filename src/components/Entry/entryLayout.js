import React from "react";
import { Link } from 'react-router-dom';
import Logo from "src/components/Header/logo";
import MockLogo from "../MockLogo/logo";
import EntryForm from "./form";
import { any, bool, element, func, string } from "prop-types";

const EntryLayout = (props) => {
    const { 
        logo,
        form,
        right,
        title,
        formBottom,
        handleSubmit,
        formError,
        errorPosition,
        formBusy,
        buttonLabel,
        formSuccess
    } = props;
    return (
        <div className="flex flex-wrap mt-0.5 relative">
            <div className={`px-4 py-15 lg_py-10 w-full bg-[#f3f4f6] flex-center ${right ? 'lg_w-1/2' : ''} `}>
                <div className="my-5 p-7.5 bg-white w-full lg_w-login-form max-w-full">
                    <div className="mb-4 lg_mb-7.5 flex justify-center">
                        <Link to='/'>
                            <MockLogo logo={logo} />
                        </Link>
                    </div>
                    <EntryForm
                        form={form}
                        title={title}
                        handleSubmit={handleSubmit}
                        bottom={formBottom}
                        buttonLabel={buttonLabel}
                        error={formError}
                        errorPosition={errorPosition}
                        isBusy={formBusy}
                        success={formSuccess}
                    />
                </div>
            </div>
            {
                right ? 
                    <div className="w-full lg_w-1/2">
                        {right}
                    </div> 
                    : ""
            }
        </div>
    )
}
export default EntryLayout;
EntryLayout.propTypes = {
    logo: any,
    form: element.isRequired,
    formBottom: element,
    right: element,
    title: string.isRequired,
    handleSubmit: func.isRequired,
    formError: string,
    formBusy: bool,
    buttonLabel: string.isRequired,
    formSuccess: element,
    errorPosition: string
}