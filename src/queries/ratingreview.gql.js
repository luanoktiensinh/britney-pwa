import { gql } from '@apollo/client';

const GET_PRODUCT_RATING_REVIEW = gql`
    query getProductReviews(
        $sku: String!
    ) {
        products(filter: { sku: { eq: $sku } }) {
            items {
                uid
                review_count
                rating_summary
                reviews {
                    items {
                        average_rating
                        summary
                        text
                        created_at
                        nickname
                        ratings_breakdown {
                            name
                            value
                        }
                    }
                }
            }
        }
    }
`;

const ADD_RATING_REVIEW_MUTATION = gql`
    mutation createProductReview($input: CreateProductReviewInput!){
        createProductReview(input: $input) {
            review {
                nickname
                summary
                text
                average_rating
                ratings_breakdown {
                    name
                    value
                }
            }
        }
    }
`;

const GET_LIST_RATING_REVIEW  = gql`
    query {
        productReviewRatingsMetadata {
        items {
            id
            name
            values {
            value_id
            value
            }
        }
        }
    }
    
`;

export default {
    getProductRatingReview: GET_PRODUCT_RATING_REVIEW,
    addRatingReviewMutation: ADD_RATING_REVIEW_MUTATION,
    getListRatingReview: GET_LIST_RATING_REVIEW
};


  