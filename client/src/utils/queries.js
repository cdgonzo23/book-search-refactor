import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      savedBooks {
        bookId
        authors
        image
        description
        title
        link
      }
    }
  }
`;