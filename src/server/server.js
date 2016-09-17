import 'core-js';

import express from 'express';
import bodyParser from 'body-parser';
import { apolloExpress, graphiqlExpress } from 'apollo-server';
import { buildSchema } from 'graphql';

// basic express setup
const PORT = 3000;
const app = express();
app.use(bodyParser.json());

// build schema
// https://wehavefaces.net/graphql-shorthand-notation-cheatsheet-17cd715861b6#.spp7klbky
const myGraphQLSchema = buildSchema(`
    # The User
    type User {
        # Name of the user
        name: String
        # Role of the user (guest|user|admin)
        role: String
    }
    # The root of all queries
    type Query {
        # Returns a list of users
        users: [User]
    }
`);

// build property resolvers
const root = {
    users() {
        return [
            { name: 'peter', role: 'admin' },
            { name: 'jan', role: 'guest' },
        ];
    },
};

// GraphQL server
// http://dev.apollodata.com/tools/apollo-server/setup.html
app.use('/api/graphql', apolloExpress({
    schema: myGraphQLSchema,
    rootValue: root,
}));

// GraphiQL UI
app.use('/graphiql', graphiqlExpress({
    endpointURL: '/api/graphql',
}));

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});
