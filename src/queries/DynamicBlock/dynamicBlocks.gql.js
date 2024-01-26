import { gql } from '@apollo/client';

const GET_DYNAMIC_BLOCK = gql`
query GetDynamicBlocks($dynamic_block_uids: [ID!]) {
    dynamicBlocks(
        input:
        {
            type: SPECIFIED,
            dynamic_block_uids: $dynamic_block_uids
        }
    )
    {
        items {
            uid
            content {
                html
            }
        }
        page_info {
            current_page
            page_size
            total_pages
        }
        total_count
    }
}
`;

export default GET_DYNAMIC_BLOCK;
