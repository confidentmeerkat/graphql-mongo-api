

## How to run
```sh
yarn install
yarn start:seed
```

If you already seeded database
```sh
yarn install
yarn start
```

http://localhost:4000/graphql

And run this query
```
query ExampleQuery {
  vehicles {
    makeId
    makeName
    vehicleTypes {
      typeId
      typeName
    }
  }
}
```