import React from 'react';
import { number } from 'prop-types';

const SliderCounter = props => {
    const { current, total, className } = props;
    return (
        <div className={`flex justify-center items-center font-bold ` + className}>
            <span>{current}/{total}</span>
        </div>
    )
};

SliderCounter.propTypes = {
    current: number.isRequired,
    total: number.isRequired
}
export default SliderCounter;