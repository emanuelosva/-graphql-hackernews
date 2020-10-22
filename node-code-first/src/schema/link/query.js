/**
 * **************************
 * @fileoverview User queries
 * **************************
 */

const { queryField, idArg, stringArg, intArg } = require('@nexus/schema')
const { inputOrderBy } = require('./inputs')

module.exports.linkQuery = queryField('link', {
  type: 'Link',
  description: 'Retrieve a specific link',
  nullable: false,
  args: {
    id: idArg({ required: true })
  },
  async resolve(_, { id }, ctx) {
    const link = await ctx.prisma.link.findOne({ where: { id } })
    if (!link) throw new Error('Link not found')
    return link
  }
})

module.exports.feedQuery = queryField('feed', {
  type: 'Feed',
  nullable: false,
  description: 'Return the last posted links',
  args: {
    filter: stringArg({ required: false }),
    skip: intArg({ required: false }),
    take: intArg({ required: false }),
    orderBy: inputOrderBy,
  },
  async resolve(_, { filter, skip, take, orderBy }, ctx) {
    const filterObject = filter
      ? {
        OR: [
          { description: { contains: filter } },
          { url: { contains: filter } },
        ]
      }
      : {}

    const count = await ctx.prisma.link.count({ where: filterObject })
    const links = await ctx.prisma.link.findMany({
      where: filterObject,
      skip,
      take,
      orderBy,
    })

    return { count, links }
  }
})
