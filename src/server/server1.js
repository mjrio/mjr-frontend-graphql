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
    }

    type User {
        name: String
        role: String
    }
`];

const resolvers = {
    RootQuery: {
        users() {
            return [
                { name: 'peter', role: 'admin' },
                { name: 'jan', role: 'guest' },
            ];
        },
    },
};

const myGraphQLSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
    // connectors,
    // logger,
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
}));

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});
