import { gql } from '@apollo/client';
export const CREATE_ACCOUNT = gql`
    mutation CreateAccount(
        $email: String!,
        $firstname: String!,
        $phone_number: String,
        $birth_day: Int!,
        $birth_month: Int!,
        $local_store_id: Int!,
        $is_promotion_subscribed: Boolean,
        $lastname: String!,
        $password: String!,
        $is_subscribed: Boolean) {
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
                customer {
                email
                __typename
                }
                __typename
            }
        }
`;
export default {
    createAccountMutation: CREATE_ACCOUNT
};