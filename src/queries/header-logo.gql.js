import { gql } from '@apollo/client';

const GET_HEADER_LOGO = gql`
query {
    storeConfig {
        header_logo_src
        logo_alt
        logo_height
        logo_width
        store_code
    }
}
`;

export default GET_HEADER_LOGO;
