const express = require("express");
const { ApolloServer, ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } = require("apollo-server-express");
const fs = require("fs");
const path = require("path");
const resolvers = require("./graphql/resolvers");
require("./models/Vehicle")
require("./models/VehicleType")

const typeDefs = fs.readFileSync(
  path.resolve(__dirname, "./graphql/schema.graphql"),
  "utf-8"
);

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: "bounded",
    // plugins: [
    //   ApolloServerPluginDrainHttpServer({ app }),
    //   ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    // ],
  });
  await server.start();
  server.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("Server is listening to port 4000");
  });
}

startApolloServer(typeDefs, resolvers);
