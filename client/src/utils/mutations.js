import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation createUser($name: String!, $email: String!, $password: String!) {
    addProfile(username: $username, email: $email, password: $password) {
      token
      profile {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($userId: ID!, $bookData: BookInput!) {
    addSkill(userId: $userId, bookData: $bookData) {
      _id
      username
      savedBooks {
        authorsbookId
        description
        image
        title
        link
      }
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation deleteBook($bookData: BookInput!) {
    removeSkill(bookData: $bookData) {
      _id
      username
      savedBooks {
        authorsbookId
        description
        image
        title
        link
      }
    }
  }
`;