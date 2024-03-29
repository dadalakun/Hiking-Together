const typeDefs = `
    scalar Date

    type Query {
        me: User!
        posts(type: String, query: String): [Post!]!
    }

    type Mutation {
        signup(name: String!, email: String!, password: String!): AuthPayload
        login(email: String!, password: String!): AuthPayload
        createpost(input: Draft!): Post!
        updatepost(input: Draft!): Post!
        removepost(postId: ID!): ID!
        labelpost(postId: ID!): ID!
        unlabelpost(postId: ID!): ID!
        testtoken: User!
    }

    type AuthPayload {
        token: String
        user: User
    }

    input Draft {
        id: ID
        title: String!
        genre: [String!]!
        startTime: Date!
        endTime: Date!
        peopleOrigin: Int!
        peopleWant: Int!
        detail: String!
        otherInfo: String!
        author: String!
        postTime: Date!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        posts: [Post!]!
    }

    type Post {
        id: ID!
        title: String!
        genre: [String!]!
        startTime: Date!
        endTime: Date!
        peopleOrigin: Int!
        peopleWant: Int!
        detail: String!
        otherInfo: String!
        author: String!
        postTime: Date!
        label: Boolean
        myPost: Boolean
    }
`

export default typeDefs;