import { gql } from '@apollo/client';

export const GET_MEGA_MENU = gql`
    query {
        getDynamicMenu {
            menu_items {
                id,
                name,
                link,
                right_content
                children{
                    name,
                    link,
                    id,
                    children{
                        name,
                        link,
                        id
                    }
                }
            }
            footer_icons{
                name,
                link,
                image 
            }
        }
    }
`;

export default {
    getMegaMenuQuery: GET_MEGA_MENU
};
