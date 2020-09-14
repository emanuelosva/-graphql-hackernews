/**
 * @fileoverview App Entrypoint Server
 * @description Based on minicourse - HowToGraphQl Node
 */

const { join } = require('path')
const { GraphQLServer } = require('graphql-yoga');


// Dummy Data
const links = [{
  id: '1',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL',
}]

// Resolvers
const resolvers = {
  // QUERYS
  Query: {
    info: () => `This is the API-GRAPHQL of a Hackersnews clone`,
    feed: () => links,
    link: (parent, args) => links.filter(link => link.id === args.id),
  },

  // MUTATIONS
  Mutation: {

    post: (parent, args) => {
      const newLink = {
        id: links.length + 1,
        description: args.description,
        url: args.url,
      }
      links.push(newLink)
      return newLink
    },

    update: (parent, args) => {
      const { id, url, description } = args || null

      const [link] = links.filter(item => item.id === id)
      if (!link) return []

      const index = links.indexOf(link)
      url ? link.url = url : ''
      description ? link.description = description : ''
      links[index] = link
      return link
    },

    delete: (parent, args) => {
      const [link] = links.filter(item => item.id === args.id)
      if (!link) return []

      const index = links.indexOf(link)
      const [removedLink] = links.splice(index, 1)
      return removedLink
    }
  },
}

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