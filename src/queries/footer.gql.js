import { gql } from '@apollo/client';

const GET_FOOTER_LINK = gql`
query {
    footers {
        title
        items {
            linktext
            linkurl
        }
    }
}
`;

export default GET_FOOTER_LINK;
