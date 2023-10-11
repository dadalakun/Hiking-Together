import mongo from './src/mongo.js';
import server from './src/server.js';
import { startStandaloneServer } from '@apollo/server/standalone';

// db
import db from './src/models';
// utils
import { getUserId } from './src/utils';

import dotenv from 'dotenv-defaults'

const startServer = async () => {
  mongo.connect();
  dotenv.config();
  const { url } = await startStandaloneServer(server, {
    listen: { port: 5001 },
    context: async ({ req, res }) => {
      return {
          db,
          userId:
              req && req.headers.authorization
                  ? getUserId(process.env.SECRET, req)
                  : null,
          SECRET: process.env.SECRET,
          SALT_ROUNDS: Number(process.env.SALT_ROUNDS),
      };
  }
  });

  console.log(`🚀  Server ready at: ${url}`);
}

startServer();