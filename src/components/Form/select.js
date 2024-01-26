import React, { Fragment } from 'react';
import { arrayOf, node, number, oneOfType, shape, string } from 'prop-types';
import {
    Option as InformedOption,
    Select as InformedSelect,
    useFieldState
} from 'informed';
import Field from '@magento/venia-ui/lib/components/Field';
import { useStyle } from '@magento/venia-ui/lib//classify';
import { FieldIcons, Message } from '@magento/venia-ui/lib/components/Field';
import defaultClasses from 'src/styles/Field/Select/select.module.css';
import Icon from '@magento/venia-ui/lib/components/Icon';
import { ChevronDown as ChevronDownIcon } from 'react-feather';

const arrow = <Icon src={ChevronDownIcon} size={24} classes={{icon: ''}} />;

const FormSelect = props => {
    const {
        className,
        before,
        classes: propClasses,
        regionError,
        field,
        label,
        items,
        message,
        ...rest
    } = props;
    const fieldState = useFieldState(field);
    const classes = useStyle(defaultClasses, propClasses);
    const inputClass =
        fieldState.error || regionError ? classes.input_error : classes.input;

    const options = items.map(
        ({ disabled = null, hidden = null, label, value, key = value }) => (
            <InformedOption
                key={key}
                disabled={disabled}
                hidden={hidden}
                value={value}
            >
                {label || (value != null ? value : '')}
            </InformedOption>
        )
    );

    return (
        <div className={className}>
            <Field 
                label={label} id={field}
                classes={{label: 'text-[15px] mb-1.5 leading-[1.5] text-[#4e515e]', root: 'content-start grid w-full'}}
            >
                <FieldIcons 
                    after={arrow}
                    before={before}
                    classes={{
                        root: 'h-full flex items-center relative', 
                        after: 'absolute top-1/2 right-[7px] -translate-y-1/2 w-5 h-5 text-[#707070] -mt-2 pointer-events-none',
                        icon: 'text-current',
                        input: 'flex items-center w-full'
                    }}
                    >
                    <InformedSelect {...rest} className={inputClass} field={field} id={field}>
                        {options}
                    </InformedSelect>
                </FieldIcons>
                <Message fieldState={fieldState}>{message}</Message>
            </Field>
        </div>
    );
};

export default FormSelect;

FormSelect.propTypes = {
    before: node,
    classes: shape({
        input: string
    }),
    field: string.isRequired,
    label: string,
    items: arrayOf(
        shape({
            key: oneOfType([number, string]),
            label: string,
            value: oneOfType([number, string])
        })
    ),
    message: node,
    className: string
};
