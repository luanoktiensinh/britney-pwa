import { gql } from '@apollo/client';

export const APPLY_GIFT_CARD = gql`
    mutation (
        $cartId: String!, 
        $giftCardCode: String!
    ) {
        applyGiftCardToCart(
            input: {
                cart_id: $cartId
                gift_card_code: $giftCardCode
            }
        ) {
            cart {
                applied_gift_cards {
                    applied_balance {
                        value
                        currency
                    }
                    code
                    current_balance {
                        value
                        currency
                    }
                    expiration_date
                }
            }
        }
    }
`;
export const REMOVE_GIFT_CARD = gql`
    mutation removeCard(
        $cartId: String!, 
        $giftCardCode: String!
    ) {
        removeGiftCardFromCart(
            input: {
                cart_id: $cartId
                gift_card_code: $giftCardCode
            }
        ) {
            cart {
                applied_gift_cards {
                    code
                }
            }
        }
    }
`;

export const GET_APPLIED_GIFT_CARD = gql`
    query ($cartId: String!) {
        cart(cart_id: $cartId) {
            applied_gift_cards {
                code
                applied_balance {
                    currency
                    value
                }
                current_balance {
                    currency
                    value
                }
                expiration_date
            }
        }
    }
`;

export default {
    getAppliedGiftCardsQuery: GET_APPLIED_GIFT_CARD,
    getGiftCardBalanceQuery: GET_APPLIED_GIFT_CARD,
    applyGiftCardMutation: APPLY_GIFT_CARD,
    removeGiftCardMutation: REMOVE_GIFT_CARD
};