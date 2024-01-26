import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Form } from 'informed';
import FormButton from "src/components/Form/button";
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import indicatorClasses from 'src/styles/LoadingIndicator/indicator.module.css'
import { bool, element, func, string } from "prop-types";
import { useIsInViewport } from '@magento/peregrine/lib/hooks/useIsInViewport';
import classNames from "classnames";

const EntryForm = (props) => {
    const {
        title,
        form,
        bottom,
        handleSubmit,
        error,
        errorPosition,
        isBusy,
        buttonLabel,
        success
    } = props;
    const errorRef = useRef(null);
    const errorInViewPort = useIsInViewport({
        elementRef: errorRef,
        renderOnce: false
    });
    const [submitting, setSubmitting] = useState(false);
    const [ submitSuccess, setSubmitSuccess ] = useState(false);
    const onSubmit = useCallback(async(value) => {
        setSubmitSuccess(false);
        setSubmitting(true);
        await handleSubmit(value);
        setSubmitting(false);
    }, []);
    useEffect(() => {
        if(!isBusy && submitting) {
            if(error) {
                !errorInViewPort && errorRef.current && errorRef.current.scrollIntoView({behavior: "smooth", block: 'center'});
            }
            else {
                setSubmitSuccess(true);
            }
        }
    }, [isBusy]);
    const mainForm = (
        <>
            <h1 className="font-bold mb-4 text-lg text-center">{title}</h1>
            <Form onSubmit={onSubmit} onChange={() => setSubmitSuccess(false)}>
                <div className="space-y-1.25">
                    {form}
                </div>
                <FormButton
                    label={buttonLabel}
                    className="mt-4.5"
                />
                {
                    errorPosition === 'bottom' && (
                        <div className={classNames(
                            {
                                "text-sm font-bold leading-[15px] text-errors-500 text-center mt-5": error
                            }
                        )} ref={errorRef}>
                            {error}
                        </div>
                    )
                }
                {
                    bottom && (
                        <div className="mt-5 mb-4.5 text-sm text-[#707070] text-center">
                            {bottom}
                        </div>
                    )
                }
            </Form>
        </>
    );

    return (
        <>
            { isBusy && <LoadingIndicator global={true} classes={indicatorClasses} /> }
            {
                errorPosition === 'top' && (
                    <div
                        className={classNames(
                            {
                                'p-3 mb-3 border border-current text-xsl leading-[1.5] text-errors-600': error
                            }
                        )}
                        ref={errorRef}
                    >
                        { error }
                    </div>
                )
            }
            {
                success && submitSuccess ? success : mainForm
            }
        </>
    )
}
export default EntryForm;
EntryForm.propTypes = {
    form: element.isRequired,
    title: string.isRequired,
    buttonLabel: string.isRequired,
    bottom: element,
    handleSubmit: func.isRequired,
    error: string,
    errorPosition: string,
    isBusy: bool,
    success: element
}
EntryForm.defaultProps = {
    errorPosition: 'top'
}