/**
 * @fileoverview Query Resolvers
 */


/**
 * Return all Links stored
 */
module.exports.feed = async (parent, args, context) => {
  const filter = args.filter
    ? {
      OR: [
        { description: { contains: args.filter } },
        { url: { contains: args.filter } },
      ],
    }
    : {}

  return await context.prisma.link.findMany({ where: filter })
}

/**
 * Fetch a Link by id
 */
module.exports.link = async (parent, args, context) => {
  const { id } = args
  return await context.prisma.link.findOne({ where: { id } })
}
