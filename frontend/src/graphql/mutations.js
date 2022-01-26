import { gql } from "@apollo/client";

export const SIGNUP_MUTATION = gql`
  mutation signup (
    $name: String!
    $email: String!
    $password: String!
  ) {
    signup (
      name: $name
      email: $email
      password: $password
    ) {
      user {
        id
        name
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation login (
    $email: String!
    $password: String!
  ) {
    login (
      email: $email
      password: $password
    ) {
      token
      user {
        name
      }
    }
  }
`;

export const CREATE_POST_MUTATION = gql`
  mutation createpost (
    $input: Draft!
  ) {
    createpost (
      input: $input
    ) {
      id
      title
      genre
      startTime
      endTime
      peopleOrigin
      peopleWant
      detail
      otherInfo
      author
      postTime
    }
  }
`;

export const UPDATE_POST_MUTATION = gql`
  mutation updatepost (
    $input: Draft!
  ) {
    updatepost (
      input: $input
    ) {
      id
      title
      genre
      startTime
      endTime
      peopleOrigin
      peopleWant
      detail
      otherInfo
      author
      postTime
    }
  }
`;

export const REMOVE_POST_MUTATION = gql`
  mutation removepost (
    $postId: ID!
  ) {
    removepost (
      postId: $postId
    )
  }
`;

export const LABEL_POST_MUTATION = gql`
  mutation labelpost (
    $postId: ID! 
  ) {
    labelpost(
      postId: $postId
    )
  }
`;

export const UNLABEL_POST_MUTATION = gql`
  mutation unlabelpost (
    $postId: ID! 
  ) {
    unlabelpost(
      postId: $postId
    )
  }
`;

export const TEST_TOKEN_MUTATION = gql`
  mutation testtoken {
    testtoken {
      id
      name
      email
    }
  }
`;