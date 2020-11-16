import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { connectDatabase } from './database';
import { typeDefs, resolvers } from './graphQL';

// create express instance
const port = 9000;

const mount = async (app: Application) => {
  const db = await connectDatabase();

  // Init Apollo express server with given schema
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ db }),
  });

  // use our express instance as server base and declare entry point for API
  server.applyMiddleware({ app, path: '/api' });

  // init the app on given port
  app.listen(port);

  // for convinience
  console.log(`[app]: http://localhost:${port}`);

  const listings = await db.listings.find({}).toArray();
  console.log(listings);
};

mount(express());
