import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './graphQL';

// create express instance
const app = express();
const port = 9000;

// Init Apollo express server with given schema
const server = new ApolloServer({ typeDefs, resolvers });

// use our express instance as server base and declare entry point for API
server.applyMiddleware({ app, path: '/api' });

// init the app on given port
app.listen(port);

// for convinience
console.log(`[app]: http://localhost:${port}`);
