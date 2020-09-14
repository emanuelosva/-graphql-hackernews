/**
 * @fileoverview App Entrypoint Server
 * @description Based on minicourse - HowToGraphQl Node
 */

const { join } = require('path')
const { GraphQLServer } = require('graphql-yoga');
const { resolvers } = require('./resolvers')


/**
 * Server
 */
const server = new GraphQLServer({
  typeDefs: join(__dirname, 'schema.graphql'),
  resolvers,
})


/**
 * Server Initialization
 */
server.start(() => {
  console.log(`Server running 🚀 on http://localhost:4000`)
})
