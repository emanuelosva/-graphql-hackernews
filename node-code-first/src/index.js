/**
 * ********************
 * @fileoverview Server
 * ********************
 */

const { ApolloServer } = require('apollo-server')
const { createContext } = require('./context')
const { schema } = require('./schema')

/**
 * GraphQl server.
 */
const server = new ApolloServer({
  schema,
  context: createContext
})

/**
 * Server lauch.
 */
server.listen({ port: 4000 }, (err) => {
  if (err) throw new Error('Server error', err)
  console.log('Server running at http://localhost:4000')
})
