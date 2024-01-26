import React, { useState, useRef, useCallback } from "react";
import { object, any, string } from 'prop-types';
import { isRequired } from '@magento/venia-ui/lib/util/formValidators';
import TextInput from '@magento/venia-ui/lib/components/TextInput';
import StarIcons from "../Gallery/starIcons";

const StarRating = (props = {}) => {
    const {ratingInfor, formRef, notAllowSelecting} = props;

    const [rating, setRating] = useState(0);

    const [hover, setHover] = useState(0);

    const [valueSelected, setValueSelected] = useState("");

    const maxActiveIndex = ratingInfor.values?.map(item => item.value).indexOf(ratingInfor.value);
    const percentageRating = 100 * (maxActiveIndex + 1)/ratingInfor.values?.length;

    const inputRef = useRef(null);
    
    const onRating = (name, value) => {
        formRef.current.setValue(name, value);
    }

    const onChangeRating = (value) => {
        if(!value) {
            setRating(0);
            setHover(0);
        }
    }

    const displayRatingReview = () => {
        if (notAllowSelecting) {
            return (
                <div className="star-rating" title={percentageRating}>
                    <span className="star-rating__label">
                        {ratingInfor.name}
                    </span>
                    <div className="star-rating__result">
                        <StarIcons ratingSummary={percentageRating}></StarIcons>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="star-rating star-rating-input">
                    <div className="star-rating-input__label">
                        {ratingInfor.name}
                    </div>
                    <TextInput
                        id={ratingInfor.id}
                        field={ratingInfor.id}
                        forwardedRef={inputRef}
                        value={valueSelected}
                        onValueChange={onChangeRating}
                        validate={isRequired}
                    />
                    <div className="star-rating-input__result">
                        {
                            ratingInfor.values.map((star, index) => {
                                index += 1;
                                return (
                                    <button
                                        type="button"
                                        key={`${ratingInfor.id}_${index}`}
                                        className={index <= (hover || rating) ? "on" : "off"}
                                        onClick={() => { setRating(index); setValueSelected(star.value_id); onRating(ratingInfor.id, star.value_id)}}
                                        onMouseEnter={() => {setHover(index);}}
                                        onMouseLeave={() => {setHover(rating);}}
                                    >
                                        <span className="star filled-star">&#9733;</span>
                                        <span className="star border-star">&#9734;</span>
                                    </button>
                                );
                            })
                        }
                    </div>
                </div>
            )
        }
    }

    return (
        displayRatingReview()
    );
};

StarRating.propTypes = {
    ratingInfor: object,
    formRef: any,
    notAllowSelecting: string
};

export default StarRating;