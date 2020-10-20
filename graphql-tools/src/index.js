/**
 * ********************
 * @fileoverview Server
 * ********************
 */

const { ApolloServer } = require('apollo-server')
const { createContext } = require('./context')

/**
 * GraphQl server.
 */
const server = new ApolloServer({
  typeDefs: `type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
  `,
  resolvers: {
    Query: {
      books: () => 'hello'
    }
  },
  context: createContext,
})

/**
 * Server lauch.
 */
server.listen({ port: 4000 }, (err) => {
  if (err) throw new Error('Server error', err)
  console.log('Server running at http://localhost:4000')
})
