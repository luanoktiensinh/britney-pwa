import { gql } from '@apollo/client';

export const GET_BRANDS = gql`
    query ($search: String! = "a"){
        searchBrand(search: $search){
            items {
                id,
                name,
                url_key,
                image
            }
        }
    }
`;
export default {
    getBrands: GET_BRANDS
}