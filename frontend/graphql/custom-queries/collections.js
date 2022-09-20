const gql = require("graphql-tag");

const CUSTOM_QUERY_COLLECTIONS = gql`
  query collections($options: CollectionListOptions) {
    collections(options: $options) {
      totalItems
      items {
        assets {
          name
          source
        }
        id
        slug
        name
        description
        customFields {
          show_in_navbar
          show_in_home_page
          show_in_list
        }
      }
    }
  }
`;

module.exports = {
  "custom-category": ({ variables }) => ({
    query: CUSTOM_QUERY_COLLECTIONS,
    variables,
  }),
};
