import { useCallback, useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';
import defaultOperations from '../../queries/ratingreview.gql'

export const useRatingReview = (props = {}) => {
    const {productDetail, onChangeFromChild} = props;
    
    const {
        getProductRatingReview,
        getListRatingReview,
        addRatingReviewMutation,
    } = mergeOperations(defaultOperations);

    const { data: productRatingReview } = useQuery(
        getProductRatingReview,
        {
            fetchPolicy: 'no-cache',
            nextFetchPolicy: 'cache-first',
            variables: {
                sku: productDetail.sku
            },
        },
        [productDetail]
    );

    const {data: listRatingReviewData} = useQuery(
        getListRatingReview,
        {
            fetchPolicy: 'cache-and-network',
            nextFetchPolicy: 'cache-first'
        }
    );

    let isSelectedRating =  true;

    const listRatingReview = useMemo(() => {
        return listRatingReviewData && listRatingReviewData?.productReviewRatingsMetadata?.items ? listRatingReviewData?.productReviewRatingsMetadata?.items : []; 
    }, [listRatingReviewData]);
    
    const [
        createProductReview,
        { 
            error: createProductReviewError,
            loading: createProductReviewLoading,
            data
        }
    ] = useMutation(addRatingReviewMutation);

    const handleSubmitFailure = useCallback(
        async listValidationErrors => {
            for (let i = 0; i < listRatingReview.length; i++) {
                if(listValidationErrors[listRatingReview[i].id]) {
                    onChangeFromChild({isValidate: false});
                    return;
                }   
            }
        },
        [listRatingReview]
    )

    const handleSubmitRatingReview = useCallback(
        async formValues => {
            try {
                const {nickname, summary, review: text} = formValues;
                let listRating = listRatingReview.map(item => {
                    return {
                        "id": item.id,
                        "value_id": formValues[item.id]
                    }
                });

                let ratingReviewVariable = {
                    variables: {
                        input: {
                            nickname,
                            summary,
                            text,
                            sku: productDetail.sku,
                            ratings: listRating
                        }
                    }
                }

                await createProductReview(ratingReviewVariable);
                onChangeFromChild({addReviewSuccess: true});
            } catch (error) {
                console.error(error);
            }
        },
        [productDetail, listRatingReview, isSelectedRating]
    );

    return {
        productRatingReview,
        listRatingReview,
        handleSubmitFailure,
        handleSubmitRatingReview
    };
};