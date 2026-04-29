import { gql } from '@apollo/client';

export const GET_IMAGES = gql`
  query GetImages {
    images {
      id
      title
      author
      imageUrl
      description
      likes
    }
  }
`;
