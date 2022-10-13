const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const fs = require("fs");
const path = require("path");
const resolvers = require("./graphql/resolvers");
require("./models/Vehicle");
require("./models/VehicleType");
const cron = require("node-cron");
const seed = require("./seed/seeder");


const task = cron.schedule("*/50 * * * *", () => {
  console.log("seeding");
  seed();
});

task.start();

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
  });
  await server.start();
  server.applyMiddleware({ app });

  app.post("/stop-cron", () => {
    task.stop();
  });

  app.listen(4000, () => {
    console.log("Server is listening to port 4000");
  });
}

startApolloServer(typeDefs, resolvers);
