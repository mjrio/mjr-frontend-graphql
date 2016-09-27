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
        name: String
        role: String
    }

    # The root of all queries
    type Query {
        users: [User]
    }
`);

// property resolvers
const root = {
    users() {
        return [
            { name: 'peter', role: 'admin' },
            { name: 'jan', role: 'guest' },
        ];
    },
};

// Route GraphQL server
// http://dev.apollodata.com/tools/apollo-server/setup.html
app.use('/api/graphql', apolloExpress({
    schema: myGraphQLSchema,
    rootValue: root,
}));

// Route GraphiQL UI
app.use('/graphiql', graphiqlExpress({
    endpointURL: '/api/graphql',
}));

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});
