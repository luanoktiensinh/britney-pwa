import { gql } from '@apollo/client';

export const CREATE_ACCOUNT = gql`
    mutation CreateAccountAfterCheckout(
        $email: String!,
        $firstname: String!,
        $phone_number: String,
        $birth_day: Int!,
        $birth_month: Int!,
        $local_store_id: Int!,
        $is_promotion_subscribed: Boolean,
        $lastname: String!,
        $password: String!,
        $is_subscribed: Boolean
    ) {
        createCustomer(
            input: {
                email: $email,
                firstname: $firstname,
                phone_number: $phone_number,
                birth_day: $birth_day,
                birth_month: $birth_month,
                local_store_id: $local_store_id,
                is_promotion_subscribed: $is_promotion_subscribed,
                lastname: $lastname,
                password: $password,
                is_subscribed: $is_subscribed
            }
        ) {
            # The createCustomer mutation returns a non-nullable CustomerOutput type
            # which requires that at least one of the sub fields be returned.

            # eslint-disable-next-line @graphql-eslint/require-id-when-available
            customer {
                email
            }
        }
    }
`;

export default {
    createAccountMutation: CREATE_ACCOUNT
};
