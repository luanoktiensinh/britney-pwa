import React, { useCallback, useRef, Fragment, useState } from 'react';
import { FormattedMessage, FormattedDate, useIntl } from 'react-intl';
import { any, object, shape, string } from 'prop-types';
import { Form } from 'informed';


import { useStyle } from '@magento/venia-ui/lib/classify';
import Button from '@magento/venia-ui/lib/components/Button';
import FormError from '@magento/venia-ui/lib/components/FormError';
import defaultClasses from '@magento/venia-ui/lib/components/ProductFullDetail/productFullDetail.module.css';
import { isRequired } from '@magento/venia-ui/lib/util/formValidators';
import Field from '@magento/venia-ui/lib/components/Field';
import TextInput from '@magento/venia-ui/lib/components/TextInput';
import { useRatingReview } from '../ProductDetailPage/useRatingReview';
import StarRating from '../ProductDetailPage/starRating';

const RatingReview = props => {
    const {
        productDetail,
        productRatingReview,
        initialValues,
        formRef
    } = props;

    const [errorRatingSelected, setErrorRatingSelected] = useState("");
    const [isAddReviewSuccess, setIsAddReviewSuccess] = useState(false);
    const onChangeFromChild = (options) => {
        const {addReviewSuccess, isValidate} = options;
        if(typeof isValidate == "boolean") {
            setErrorRatingSelected(isValidate ? "" : "Please select one of each of the ratings above.");
        }
        if(typeof addReviewSuccess == "boolean") {
            setErrorRatingSelected("");
            setIsAddReviewSuccess(true);
        }
    }

    const {
        listRatingReview,
        handleSubmitFailure,
        handleSubmitRatingReview
    } = useRatingReview({productDetail, onChangeFromChild});
    const { formatMessage } = useIntl();

    const classes = useStyle(defaultClasses, props.classes);

    const formApiRef = useRef(null);
    const setFormApi = useCallback(api => (formApiRef.current = api), []);

    let listProductReviewElement = [];
    let listMapping = new Map(listRatingReview?.map(obj => [obj.name, obj]))
    productRatingReview?.reviews?.items.forEach((item, index) => {
        let listReviewItems = [];
        item.ratings_breakdown.forEach(criteria => {
            let tempObj = JSON.parse(JSON.stringify(criteria));
            tempObj["values"] = listMapping.get(tempObj?.name)?.values;
            listReviewItems.push(
                <StarRating ratingInfor={tempObj} notAllowSelecting="true" key={`${item.created_at}_${tempObj.name}`}></StarRating>
            )
        });
        listProductReviewElement.push(
            <div className='pdp-rating-review__item' key={item.created_at + '-' + index}>
                <div className='pdp-rating-review__item--title'>{item.summary}</div>
                <div className='pdp-rating-review__item--rating'>
                    {listReviewItems}
                </div>
                <div className='pdp-rating-review__item--content'>
                    <div className='pdp-rating-review__item--content-description'>{item.text}</div>
                    <div className='pdp-rating-review__item--content-author'>
                        Review by {item.nickname} <FormattedDate value={item.created_at} />
                    </div>
                </div>
            </div>
        )
    });

    return (
        <Fragment>
            <div className='pdp-rating-review__list'>
                {listProductReviewElement}
            </div>
            <Form
                getApi={setFormApi}
                className={[classes.form, ""].join("pdp-rating-review__form")}
                initialValues={initialValues && initialValues}
                onSubmit={handleSubmitRatingReview}
                onSubmitFailure={handleSubmitFailure}
            >
                <div className='pdp-rating-review__form--rating' ref={formRef}>
                    <div className='pdp-rating-review__form--username'>
                        <div>You're reviewing: </div>
                        <strong dangerouslySetInnerHTML={{__html: productDetail.name}}></strong>
                    </div>
                    <div className='pdp-rating-review__form--title'>
                        Your Rating
                    </div>
                    <div className={`${isAddReviewSuccess ? 'rating-form-disabled' : ''}`}>
                        {
                            listRatingReview?.map((item, index) => {
                                return (
                                    <StarRating ratingInfor={item} formRef={formApiRef} key={item.id}></StarRating>
                                )
                            })
                        }
                    </div>
                </div>
                <p className='message-root_error'>{errorRatingSelected}</p>
                <Field
                    id="nickname"
                    label={formatMessage({
                        id: 'ratingReview.nickNameText',
                        defaultMessage: 'Nickname'
                    })}
                >
                    <TextInput
                        id="nickname"
                        field="nickname"
                        validate={isRequired}
                        aria-label={formatMessage({
                            id: 'ratingReview.nickNameRequired',
                            defaultMessage: 'Nickname Required'
                        })}
                        {...(isAddReviewSuccess ? { disabled: true } : {})}
                    />
                </Field>
                <Field
                    id="summary"
                    label={formatMessage({
                        id: 'ratingReview.summaryText',
                        defaultMessage: 'Summary'
                    })}
                >
                    <TextInput
                        id="summary"
                        field="summary"
                        validate={isRequired}
                        aria-label={formatMessage({
                            id: 'ratingReview.summaryRequired',
                            defaultMessage: 'Summary Required'
                        })}
                        {...(isAddReviewSuccess ? { disabled: true } : {})}
                    />
                </Field>
                <Field
                    id="review"
                    label={formatMessage({
                        id: 'ratingReview.reviewRequired',
                        defaultMessage: 'Review'
                    })}
                >
                    <TextInput
                        id="review"
                        field="review"
                        validate={isRequired}
                        aria-label={formatMessage({
                            id: 'ratingReview.reviewText',
                            defaultMessage: 'Review Required'
                        })}
                        {...(isAddReviewSuccess ? { disabled: true } : {})}
                    />
                </Field>
                <div className='pdp-rating-review__form--button'>
                    <Button
                        priority="high"
                        type="button"
                        {...(isAddReviewSuccess ? { disabled: true } : {})}
                        onClick={() => {formApiRef.current.submitForm();}}
                    >
                        {isAddReviewSuccess ? 
                            (
                                <FormattedMessage
                                    id={'ratingReview.reviewSubmittedText'}
                                    defaultMessage={'Review submitted!'}
                            />) : (
                                <FormattedMessage
                                    id={'ratingReview.submitReviewText'}
                                    defaultMessage={'Submit Review'}
                            />
                            )
                        }
                    </Button>
                </div>
            </Form>
        </Fragment>
    );
};

RatingReview.propTypes = {
    productDetail: object,
    productRatingReview: object,
    formRef: any,
    initialValues: shape({
        nickName: string.isRequired,
        review: string.isRequired,
        summary: string.isRequired,
    })
};

export default RatingReview;