import React, { Fragment, useMemo } from 'react';
import { bool, node, shape, string } from 'prop-types';
import { Text as InformedText } from 'informed';
import useFieldState from '@magento/peregrine/lib/hooks/hook-wrappers/useInformedFieldStateWrapper';

import { useStyle } from '@magento/venia-ui/lib/classify';
import { Message } from '@magento/venia-ui/lib/components/Field';
import defaultClasses from 'src/styles/Field/TextInput/textInput.module.css';

const TextInput = props => {
    const {
        className,
        label,
        required,
        classes: propClasses,
        regionError,
        field,
        message,
        ...rest
    } = props;
    const fieldState = useFieldState(field);

    const classes = useStyle(defaultClasses, propClasses);
    var inputClass =
        fieldState.error || regionError ? classes.input_error : classes.input;
    const isRequired = useMemo(() => required || (rest.validate?.name === 'isRequired'), [rest, required]);
    return (
        <div className={className}>
            <label>
                {
                    label && (
                        <p className='block mb-1.5 text-sml text-[#4e515e]'>
                            {label} {isRequired && <span className='text-errors-500'>*</span>}
                        </p>
                    )
                }
                <InformedText {...rest} className={inputClass} field={field} />
            </label>
            <Message fieldState={fieldState}>{message}</Message>
        </div>
    );
};

export default TextInput;

TextInput.propTypes = {
    after: node,
    before: node,
    classes: shape({
        input: string
    }),
    field: string.isRequired,
    message: node,
    className: string,
    label: string,
    required: bool
};

TextInput.defaultProps = {
    required: false
}