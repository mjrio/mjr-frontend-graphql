# GraphQL Advanced Topics

## Caching and batching
- Cache by globally Unique Cache Key (object id + type) and/or query path
- Batch multiple query in one
- Server request batching (dataLoader: https://github.com/facebook/dataloader)

See also:
[https://medium.com/apollo-stack/graphql-at-facebook-by-dan-schafer-38d65ef075af#.xohvzi63q](https://medium.com/apollo-stack/graphql-at-facebook-by-dan-schafer-38d65ef075af#.xohvzi63q)

----

## Error handling

- Always return 200 OK :)
- Bad Request (400)
    - Query validation
    - Query timeout
    - Query whitelisting
    - Return error object
- Not Found (404)
    - Return 'null'
- Unauthorized (401)
    - Global = JWT
    - Field level: return 'null'
