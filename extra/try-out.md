## The Star Wars Graphql API

[http://graphql-swapi.parseapp.com/](http://graphql-swapi.parseapp.com/)

#### Sample

    query {
      allFilms {
        edges {
          node {
            id
            title
          }
        }
      }
    }

#### Sample 2

    query {
      film(id: "ZmlsbXM6MQ==") {
        title
        openingCrawl
        producers
        starshipConnection(first: 10) {
          edges {
            node {
              name
              model
              manufacturers
              passengers
              pilotConnection(first: 10) {
                edges {
                  node {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }

## GitHub GraphQL

[https://graphql-explorer.githubapp.com](https://graphql-explorer.githubapp.com)

#### Info
- The new github graphql qpi
[https://medium.com/apollo-stack/the-new-github-graphql-api-811b005d1b6e#.serk4whji](https://medium.com/apollo-stack/the-new-github-graphql-api-811b005d1b6e#.serk4whji)

- Github Graphql Schema
[https://gist.github.com/helfer/16ae2323ff3c23cedc69471a973a4f0f](https://gist.github.com/helfer/16ae2323ff3c23cedc69471a973a4f0f)

#### Sample

```
    query {
      viewer {
        id
        company
      }
      contributedRepositories(first: 10) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
```

```
    query {
      repositoryOwner(login: "Euricom") {
        id
        login
        repository(name: "timesheet-zone") {
          id
          description
          issues(first: 20, states: OPEN) {
            edges {
              node {
                author {
                  id
                  name
                }
              }
            }
            totalCount
          }
          mentionableUsers(first: 20) {
            edges {
              node{
                id
                name
              }
            }
          }
        }
        repositories(first: 10) {
          edges {
            node {
              id
              name
            }
          }
          totalCount
        }
      }
    }
```
