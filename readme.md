

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

To retrieve a vehicle by date.
```
//query
query ExampleQuery($dateBefore: String, $dateAfter: String) {
  vehicles(dateBefore: $dateBefore, dateAfter: $dateAfter) {
    makeName
    vehicleTypes {
      typeId
      typeName
    }
  }
}

// variable
{
  "dateBefore": "2022-10-11",
  "dateAfter": "2022-10-09"
}
```