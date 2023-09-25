import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
      _id
      username
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