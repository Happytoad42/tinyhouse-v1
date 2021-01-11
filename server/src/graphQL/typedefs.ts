import { gql } from 'apollo-server-express';

// Type definitions for every schema field there is
export const typeDefs = gql`
  type Query {
    authUrl: String!
  }
  type Mutation {
    logIn: String!
    logOut: String!
  }
`;
