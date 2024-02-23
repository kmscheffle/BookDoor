import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook($bookText: String!) {
    addBook(bookText: $bookText) {
      _id
      bookText
      bookAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($bookId: ID!, $commentText: String!) {
    addComment(bookId: $bookId, commentText: $commentText) {
      _id
      bookText
      bookAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
