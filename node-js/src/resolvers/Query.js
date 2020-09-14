/**
 * @fileoverview Query Resolvers
 */


/**
 * Return all Links stored
 */
module.exports.feed = async (parent, args, context) => {
  return await context.prisma.link.findMany()
}

/**
 * Fetch a Link by id
 */
module.exports.link = async (parent, args, context) => {
  const { id } = args
  return await context.prisma.link.findOne({ where: { id } })
}
