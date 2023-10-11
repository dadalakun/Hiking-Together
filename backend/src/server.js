import { ApolloServer } from '@apollo/server';
import typeDefs from './schema';
// resolvers
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import User from './resolvers/User'
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