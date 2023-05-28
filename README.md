# graphiql-app

### To check when the token expires - the user should be redirected from the "Main page" automatically you can open in the browser indexeDB and delete DB with user must be redirected to the "Login" page, accoding our logic.

### some examples of the queries:

```query {
  characters(page: 2, filter: { name: "rick" }) {
    info {
      count
    }
    results {
      name
    }
  }
  location(id: 1) {
    id
  }
  episodesByIds(ids: [1, 2]) {
    id
  }
}
```