import { ApolloServer } from '@apollo/server';
import typeDefs from './schema.js';
// resolvers
import Query from './resolvers/Query.js';
import Mutation from './resolvers/Mutation.js';
import User from './resolvers/User.js'
import DateResolver from "./resolvers/Date.js";

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: {
        Query,
        Mutation,
        User,
        Date: DateResolver,
    },
});

export default server;