import React from 'react';
import { shape, string } from 'prop-types';
import { useStyle } from '@magento/venia-ui/lib/classify';

import Shimmer from '@magento/venia-ui/lib/components/Shimmer/index.js';
import defaultClasses from 'src/styles/ProductSort/pageSizeSelectionShimmer.module.css';

const PageSizeSelectionShimmer = props => {
    const classes = useStyle(defaultClasses, props.classes);

    return (
        <div className={classes.root} aria-live="polite" aria-busy="true">
            <Shimmer
                classes={{ root_button: classes.sortButtonShimmer }}
                type="button"
            />
        </div>
    );
};

PageSizeSelectionShimmer.propTypes = {
    classes: shape({
        root: string,
        sortButtonShimmer: string
    })
};

export default PageSizeSelectionShimmer;