import { gql } from 'apollo-server-express';

// Type definitions for every schema field there is
export const typeDefs = gql`
  type Listing {
    id: ID!
    title: String!
    image: String!
    address: String!
    price: Int!
    numOfGuests: Int!
    numOfBeds: Int!
    numOfBaths: Int!
    rating: Int!
  }
  type Query {
    listings: [Listing!]!
  }
  type Mutation {
    deleteListing(id: ID!): Listing!
  }
`;
