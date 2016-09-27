import 'core-js';

import express from 'express';
import bodyParser from 'body-parser';
import { apolloExpress, graphiqlExpress } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';

// basic express setup
const PORT = 3000;
const app = express();
app.use(bodyParser.json());

// define schema
const typeDefs = [`
    schema {
        query: RootQuery
    }

    type RootQuery {
        users: [User]
        user(filter: String): User
    }

    type User {
        name: String
        role: String
        picture: ProfilePicture
    }

    type ProfilePicture {
        url: String
        height: Int
        width: Int
    }
`];

const users = [
    {
        name: 'peter',
        role: 'admin',
        profilePicture: {
            url: 'http://lorempixel.com/400/200/people/',
            width: 400,
            height: 200,
        },
    },
    {
        name: 'jan',
        role: 'guest',
    },
];

const resolvers = {
    RootQuery: {
        users() {
            return users;
        },
        user(root, { filter }) {
            return users.find(user => user.name === filter);
        },
    },
    User: {
        picture(user) {
            return user.profilePicture;
        },
    },
};

const myGraphQLSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

// GraphQL server
// http://dev.apollodata.com/tools/apollo-server/setup.html
app.use('/api/graphql', apolloExpress({
    schema: myGraphQLSchema,
    formatError: (err) => {
        console.log(err);
        return err;
    },
}));

// GraphiQL UI
app.use('/graphiql', graphiqlExpress({
    endpointURL: '/api/graphql',
    query: `query { 
  users { 
    name 
  }
}`,
}));

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});
