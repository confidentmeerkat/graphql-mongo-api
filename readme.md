

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

To retrieve a vehicle by makeid
```
//query
query ExampleQuery($makeId: Int!) {
  vehicle(makeId: $makeId) {
    makeName
    vehicleTypes {
      typeId
      typeName
    }
  }
}

// variable
{
    "makeId": 4877
}
```