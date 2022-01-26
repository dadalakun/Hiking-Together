import { gql } from "@apollo/client";

export const WHO_AM_I_QUERY = gql`
  query meQuery {
    me {
      id
      name
      email
    }
  }
`;

export const GET_POSTS_QUERY = gql`
  query getPostsQuery (
    $type: String
    $query: String
  ) {
    posts (
      type: $type
      query: $query
    ) {
      id
      title
      genre
      startTime
      endTime
      peopleOrigin
      peopleWant
      detail
      author
      otherInfo
      postTime
      label
      myPost
    }
  }
`;
