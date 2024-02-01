import React, { Fragment } from 'react';
import { any, string, shape, number } from 'prop-types';

const BadgeLabel = props => {
    const { productDetail, className } = props;

    return (        
        productDetail?.badges?.length ? 
            <div className={className}>
                {productDetail.badges[0].label}
            </div>
            : null
    )
};

export default BadgeLabel;

BadgeLabel.propTypes = {
    className: string,
    productDetail: shape({
        __typename: string,
        price_range: shape({
            maximum_price: shape({
                final_price: shape({
                    currency: string,
                    value: number
                }),
                regular_price: shape({
                    currency: string,
                    value: number
                }),
                discount: shape({
                    amount_off: number
                })
            })
        }).isRequired
    })
};