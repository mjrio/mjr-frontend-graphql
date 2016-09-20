# GraphQL, the future of REST API's

![](./images/overview.png)

> GraphQL is official released by facebook.

---

# mjr

http://github.com/mjrio/mjr-graphql

---

## Problems of REST API

* Starts simple and pure but outgrow itself quickly
<!-- .element: class="fragment" data-fragment-index="1" -->

* Over fetching as API requirements grow
<!-- .element: class="fragment" data-fragment-index="2" -->

* Multiple round trips to render single views
<!-- .element: class="fragment" data-fragment-index="3" -->

* Documentation is none existing or outdated
<!-- .element: class="fragment" data-fragment-index="4" -->

----

<!-- .slide: data-transition="none" -->
### The complexity of REST architecture

![](./images/architec-microservices.png)

---

## GraphQL solves many of the REST problems

* There is no under or over fetching. You get what you ask.
<!-- .element: class="fragment" data-fragment-index="1" -->

* No more multiple round trips
<!-- .element: class="fragment" data-fragment-index="2" -->

* Versioning made easy.
<!-- .element: class="fragment" data-fragment-index="3" -->

* It's strongly-typed, self-documenting & has introspection
<!-- .element: class="fragment" data-fragment-index="4" -->

----

<!-- .slide: data-transition="none" -->
### The simplicity of GraphQL

![](./images/architec-graphql.png)

----

## It's more then a hype

* Used at facebook for more then 4 year, recently release as open source.
* Used at Twitter, GitHub, Pintrest, Financial Times, Thomas Cook Group, and many more.
* Backend as a service ([Reindex](https://www.reindex.io/), [Scaphold](https://scaphold.io/#/))
* GraphQL endpoint for: WordPress/Drupal, [GitHub](https://medium.com/apollo-stack/the-new-github-graphql-api-811b005d1b6e#.yhrl0cep2), PostgreSQL, Rethinkdb
* Available in many languages and frameworks (JS, .NET, Ruby, ...)

----

## In the words of the GitHub platform team:

> GraphQL represents a massive leap forward for API development. Type safety,
> introspection, generated documentation, and predictable responses benefit
> both the maintainers and consumers of our platform. We’re looking forward to
> our new era of a GraphQL-backed platform, and we hope that you do, too!

---

# How it works

----

### A graphql query

```json
    query {
        me {
            name
        }
    }
```

> GraphQL queries look a lot like JSON objects without data.

```javascript
    // JSON result
    data: {
        me: {
            name: "Peter"
        }
    }
```
<!-- .element: class="fragment" data-fragment-index="1" -->

----

### Another graphql query

Get list of users

```json
    query {
        users {
            name
            role
        }
    }
```

```javascript
    // JSON result
    data: {
        users: [
            { name: "Peter", role: "admin" },
            { name: "Jan", role: "admin" }
        }
    }
```

----

### A GraphQL type

User Type

```json
    type User {
        name: String
        role: String
    }

    type Query {
        users(): [User]
    }
```

mapped to code

```javascript
    // type Query {
    {
        // name: String
        users() {
            return users;
        }
    }
```

----

### GraphiQL

![](./images/graphiql.png)

---

# The GraphQL query language

> Lets go in detail

----

### Query with field argument

```json
    query {
        user(id: 1234) {        <-- field argument
            id
            name
        }
    }
```

```javascript
    // JSON result
    data: {
        user: {
            id: 1234,
            name: "Peter"
        }
    }
```

----

### Query with complex field

```json
    query {
        me {
            name
            profilePicture {
                width
                height
                url
            }
        }
    }
```

```javascript
    // JSON result
    data: {
        me: {
            name: "Peter",
            profilePicture {
                "width": 50,
                "height": 50,
                "url": "https://cdn/some.jpg"
            }
        }
    }
```

----

### Query with size field argument

```json
    query {
        me {
            name
            profilePicture(size: 3000) {
                width
                height
                url
            }
        }
    }
```

----

### Query with aliases

```json
    query {
        me {
            name
            thumbnail: profilePicture(size: 50) {
                url
            }
            profilePicture(size: 3000) {
                width
                url
            }
        }
    }
```

```javascript
    // JSON result
    data: {
        me {
            name: "Peter",
            thumbnail {
                url: "https://cdn/50.jpg"
            },
            profilePicture {
                width: 3000,
                url: "https://cdn/3000.jpg"
            }
        }
    }
```

----

### Query with variables

```json
    query {
        users(id: 1) {
            name
        }
    }
```
<!-- .element: class="fragment" data-fragment-index="1" -->

```json
    query findUser($userId: String!) {
        users(id: $userId) {
            name
        }
    }
```
<!-- .element: class="fragment" data-fragment-index="2" -->

```javascript
    // variables
    {
        userId: 1
    }
```
<!-- .element: class="fragment" data-fragment-index="3" -->

----

### Query with relations/joins

```json
    query {
        me {
            name
            friends {
                name
            }
        }
    }
```

```javascript
    // JSON result
    data: {
        me: {
            name: "Peter",
            friends: [
                { name: "bob" },
                { name: "jan" },
            ]
        }
    }
```

----

### Query with paging and filtering

```json
    query {
        me {
            name
            friends(orderby: IMPORTANCE, first: 1) {
                name
                events(first: 10) {
                    name
                }
            }
        }
    }
```

----

### Query Fragments

```json
    query {
        lee: user(id: "1") {
            ...UserFragment
        }
        sam: user(id: "2") {
            ...UserFragment
        }
    }

    fragment UserFragment on User {
        name
        email
    }
```

---

# GraphQL mutation

> Mutation is like an action in Redux

----

## Simple mutation

```json
    // query
    query {
        article(id: 1234) {
            name
            status
        }
    }
```

```json
    // mutation
    mutation {
        deleteArticle(id: 1234) {
            status
        }
    }
```

----

## Complex mutation

```json
    mutation newArticle {
        createArticle(article: {
            slug: "something-new",
            title: "Something New",
            status: live,
            relatedArticles: [
                { id: 1 }
            ]
        }) {
            id
            relatedArticles {
                slug
            }
        }
    }
```

---

# Advanced GraphQL queries

----

### GraphQL Directives

```json
    // @skip
    query myAwesomeQuery($latest: Boolean) {
        oldField @skip(if: $latest)
    }
```

```json
    // @include
    query myAwesomeQuery($isAwesome: Boolean) {
        awesomeField @include(if: $isAwesome)
    }
```

> More directives to come:
> @defer, @stream and @live

----

### GraphQL Directives

We can use interfaces and union types

```json
    query {
        user(name: 'peter') {
            name
            email
            ... on Manager {
                role
            }
            ... on Employee {
                managerName
            }
        }
    }
```

```javascript
    data: {
        user: {
            name: "Peter",
            managerName: "Wim"
        }
    }
```

---

# GraphQL Type System

> We all love types, why not on our API's

----

## The GraphQL Schema

```json
    type User {
        name: String
        profilePicture(size: Int = 50): ProfilePicture
        friends(first: Int, orderby: FriendOrderEnum): [User]
        events(first: Int): [Event]
    }

    enum FriendOrderEnum {
        FIRST_NAME,
        IMPORTANCE
    }

```
```json
    type ProfilePicture {
        height: Int,
        width: Int,
        url: String
    }

    type Event {
        name: String
        attendees(first: Int): [User]
    }

    type Query {
        user (id: Int): User
        users(first: Int): [User]
    }
```

----

### We can query the types

```json
    query {
        __schema {
            queryType { name }
            types {
                name
                fields {
                    name
                    type {
                        kind
                        name
                        ofType { name }
                    }
                }
            }
        }
    }
```

---

# What's next

----

## Reactive Graphql

![](./images/reactive-graphql.png)

2017 - Meteor’s Reactive GraphQL(Apollo)

----

## Help and Information

- [http://graphql.org/](http://graphql.org/)
- [graphqlweekly](https://graphqlweekly.com/)
- [learngraphql.com](https://learngraphql.com/)
- [apollo-stack](https://medium.com/apollo-stack)
- [awesome-graphql](https://github.com/chentsulin/awesome-graphql)

----

## Try-out

The Star Wars Graphql API

[http://graphql-swapi.parseapp.com/](http://graphql-swapi.parseapp.com/)

The GitHub API

[https://graphql-explorer.githubapp.com](https://graphql-explorer.githubapp.com)

----

## Upcoming Events
- http://graphql.org/community/upcoming-events/

----

# Your next API in GraphQL?
