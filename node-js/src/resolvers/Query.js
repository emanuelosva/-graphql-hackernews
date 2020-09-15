/**
 * *****************************
 * @fileoverview Query Resolvers
 * *****************************
 */


/**
 * Return all Links stored
 */
module.exports.feed = async (parent, args, context) => {
  const { filter, skip, take, orderBy } = args

  const filterObject = filter
    ? {
      OR: [
        { description: { contains: filter } },
        { url: { contains: filter } },
      ],
    }
    : {}

  const links = await context.prisma.link.findMany({
    where: filterObject,
    skip,
    take,
    orderBy,
  })
  const count = await context.prisma.link.count({ where: filterObject })

  return {
    count,
    links,
  }
}

/**
 * Fetch a Link by id
 */
module.exports.link = async (parent, args, context) => {
  const { id } = args
  return await context.prisma.link.findOne({ where: { id } })
}
