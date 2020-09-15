/**
 * *****************************
 * @fileoverview Query Resolvers
 * *****************************
 */


/**
 * Return all Links stored
 */
module.exports.feed = async (parent, args, context) => {
  const { filter, skip, take } = args

  const filterString = filter
    ? {
      OR: [
        { description: { contains: filter } },
        { url: { contains: filter } },
      ],
    }
    : {}

  return await context.prisma.link.findMany({
    where: filterString,
    skip,
    take,
  })
}

/**
 * Fetch a Link by id
 */
module.exports.link = async (parent, args, context) => {
  const { id } = args
  return await context.prisma.link.findOne({ where: { id } })
}
