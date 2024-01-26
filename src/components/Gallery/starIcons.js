import React, { Fragment } from 'react';
import { any, string, shape } from 'prop-types';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from 'src/styles/Gallery/starIcons.module.css';

const StarIcons = (props = {}) => {
    const {ratingSummary, className} = props;
    const percentageRating = ratingSummary || 0;
    const classes = useStyle(defaultClasses, props.className);

    return (
        <div className={`${classes.root} ${className}`} title={percentageRating + "%"}>
            <span className={classes.wrapper} style={{width: percentageRating + "%"}}>
                <span className={classes.content}></span>
            </span>
        </div>
    );
};

StarIcons.propTypes = {
    ratingSummary: any,
    className: string
};

export default StarIcons;