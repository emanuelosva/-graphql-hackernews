/**
 * @fileoverview App Entrypoint Server
 * @description Based on minicourse - HowToGraphQl Node
 */

const { join } = require('path')
const { GraphQLServer } = require('graphql-yoga')
const { resolvers } = require('./resolvers')
const { PrismaClient } = require('@prisma/client')

/**
 * Prisma ORM instance
 */
const prisma = new PrismaClient()

/**
 * Server
 */
const server = new GraphQLServer({
  typeDefs: join(__dirname, 'schema.graphql'),
  resolvers,
  context: {
    prisma,
  },
})

/**
 * Server Initialization
 */
server.start(() => {
  console.log('Server running 🚀 on http://localhost:4000')
})
