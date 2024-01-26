import Dialog from '@magento/venia-ui/lib/components/Dialog';
import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'
import classes from './lightbox.module.css';
const Lightbox = forwardRef((props, ref) => {
    const { 
        show = false,
        onCancel,
        children
    } = props;
    const content = (
        <div className={classes['dialog-body--container']} ref={ref}>
            {children}
        </div>
    )
    return (
        <Dialog
            isOpen={show}
            classes={classes}
            onCancel={onCancel}
            shouldShowButtons={false}
            shouldUnmountOnHide={false}
        >
            {content}
        </Dialog>
    )
})

Lightbox.propTypes = {
    show: PropTypes.bool,
    onCancel: PropTypes.func
}
Lightbox.defaultProps = {
    show: false,
    onCancel: () => {}
}

export default Lightbox