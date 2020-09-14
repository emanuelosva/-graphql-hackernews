/**
 * @fileoverview Query Resolvers
 */


/**
 * Querys aboutn Links
 */
module.exports.linkQuerys = {

  // Return app info
  info: () => 'This is the API-GRAPHQL of a Hackersnews clone',

  // Return all Links
  feed: async (parent, args, context) => {
    return await context.prisma.link.findMany()
  },

  // Fetch a link by id
  link: async (parent, args, context) => {
    const { id } = args
    return await context.prisma.link.findOne({ where: { id } })
  },
}
