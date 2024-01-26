import React from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { useStyle } from '@magento/venia-ui/lib/classify';
import Image from '@magento/venia-ui/lib/components/Image';
import { gql, useQuery } from '@apollo/client';
import logo from '../../images/no-image.png';
import GET_HEADER_LOGO from '../../queries/header-logo.gql';

/**
 * A component that renders a logo in the header.
 *
 * @kind functional component
 *
 * @param {props} props React component props
 *
 * @returns {React.Element} A React component that displays a logo.
 */
const Logo = props => {
    const classes = useStyle({}, props.classes);
    const { formatMessage } = useIntl();
    const title = formatMessage({ id: 'logo.title', defaultMessage: 'Venia' });
    
    let { height, width, imageUrl } = props,
         altText = title;

    const { data: logoData } = useQuery(GET_HEADER_LOGO, {
        fetchPolicy: 'no-cache',
    });
    
    if(!imageUrl) {
        if(logoData?.storeConfig) {
            height = logoData.storeConfig.logo_height ? logoData.storeConfig.logo_height : height ;
            width = logoData.storeConfig.logo_width ? logoData.storeConfig.logo_width : width;
            altText = logoData.storeConfig.logo_alt;
            imageUrl = logoData.storeConfig.header_logo_src ? `/media/logo/${logoData.storeConfig.header_logo_src}` : logo;
        } else {
            imageUrl = logo;
        }
    }

    return (
        <Image
            classes={classes}
            className={classes.main ?? "header-logo"}
            height={height}
            src={imageUrl}
            alt={altText || ''}
            title={title}
            width={width}
        />
    );
};

/**
 * Props for the Logo component.
 *
 * @kind props
 *
 * @property {Object} classes An object containing the class names for the Logo component.
 * @property {string} classes.logo Classes for logo
 * @property {number} [height=18] Height of the logo.
 * @property {number} [width=102] Width of the logo.
 */
Logo.propTypes = {
    classes: PropTypes.shape({
        logo: PropTypes.string
    }),
    height: PropTypes.number,
    width: PropTypes.number,
    altText: PropTypes.string,
    imageUrl: PropTypes.string
};

Logo.defaultProps = {
    height: 18,
    width: 102
};

export default Logo;