/**
 ******************************************************
 * @fileoverview App Entrypoint Server
 * @description Based on minicourse - HowToGraphQl Node
 ******************************************************
 */

const { join } = require('path')
const { GraphQLServer, PubSub } = require('graphql-yoga')
const { PrismaClient } = require('@prisma/client')
const { resolvers } = require('./resolvers')
const config = require('./config')

/**
 * App Settings
 */
const { port } = config.app

/**
 * Prisma ORM instance
 */
const prisma = new PrismaClient()

/**
 * PubSub emmiter
 */
const pubsub = new PubSub()

/**
 * Server
 */
const server = new GraphQLServer({
  typeDefs: join(__dirname, 'schema.graphql'),
  resolvers,
  context: (request) => {
    // This info is accessible for all resolvers
    return {
      ...request,
      prisma,
      pubsub
    }
  }
})

/**
 * Server Initialization
 */
server.start({ port }, () => {
  console.log(`Server running 🚀 on http://localhost:${port}`)
})
