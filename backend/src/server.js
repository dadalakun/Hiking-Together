import { GraphQLServer } from 'graphql-yoga';

// resolvers
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import User from './resolvers/User'
import DateResolver from "./resolvers/Date.js";
// db
import db from './models';
// utils
import { getUserId } from './utils';

import dotenv from 'dotenv-defaults'

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        User,
        Date: DateResolver,
    },
    context: ({ request }) => {
        dotenv.config();
        return {
            db,
            userId:
                request && request.headers.authorization
                    ? getUserId(process.env.SECRET, request)
                    : null,
            SECRET: process.env.SECRET,
            SALT_ROUNDS: Number(process.env.SALT_ROUNDS),
        };
    },
}); 

export default server;