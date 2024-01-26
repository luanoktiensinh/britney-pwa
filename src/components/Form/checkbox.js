import React, { Fragment, useEffect } from 'react';
import { node, shape, string } from 'prop-types';
import { Checkbox as InformedCheckbox, useFieldApi } from 'informed';
import useFieldState from '@magento/peregrine/lib/hooks/hook-wrappers/useInformedFieldStateWrapper';
import { Message } from '@magento/venia-ui/lib/components/Field';
import { Check } from 'react-feather';

/* TODO: change lint config to use `label-has-associated-control` */
/* eslint-disable jsx-a11y/label-has-for */

const checkedIcon = <Check width={14} height={14} />;

const Checkbox = props => {
    const {
        className,
        ariaLabel,
        field,
        fieldValue,
        id,
        label,
        message,
        ...rest
    } = props;
    const fieldApi = useFieldApi(field);
    const fieldState = useFieldState(field);
    const icon = fieldState.value ? checkedIcon : null;

    useEffect(() => {
        if (fieldValue != null && fieldValue !== fieldState.value) {
            fieldApi.setValue(fieldValue);
        }
    }, [fieldApi, fieldState.value, fieldValue]);

    return (
        <div className={className}>
            <label
                data-cy="Checkbox-label"
                aria-label={ariaLabel}
                className="flex"
                htmlFor={id}
            >
                <InformedCheckbox
                    {...rest}
                    className="hidden"
                    field={field}
                    id={id}
                />
                <span className='mt-0.5 min-w-4.5 h-4.5 border border-[#d9d9d9] bg-white text-black flex-center'>
                    {icon}
                </span>
                <span className="text-sm text-[#707070] cursor-pointer ml-2">{label}</span>
            </label>
            <Message fieldState={fieldState}>{message}</Message>
        </div>
    );
};

export default Checkbox;

Checkbox.propTypes = {
    ariaLabel: string,
    classes: shape({
        icon: string,
        input: string,
        label: string,
        message: string,
        root: string
    }),
    field: string.isRequired,
    id: string,
    label: node.isRequired,
    message: node,
    className: string
};

/* eslint-enable jsx-a11y/label-has-for */
