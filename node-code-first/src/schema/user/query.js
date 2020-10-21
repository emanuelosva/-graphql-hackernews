/**
 * **************************
 * @fileoverview User queries
 * **************************
 */

const { queryField, stringArg } = require('@nexus/schema')

module.exports.getUserQuery = queryField('getUser', {
  type: 'User',
  description: 'Return the user that matches the passed id',
  args: {
    id: stringArg({ required: true })
  },
  async resolve(_, { id }, ctx) {
    const user = await ctx.prisma.user.findOne({ where: { id } })
    if (user) return user
    throw new Error('User not found')
  }
})

module.exports.getCurrentUSer = queryField('getCurrentUSer', {
  type: 'User',
  description: 'Return the user that matches the passed id',
  args: {
    id: stringArg({ required: true })
  },
  async resolve(_, { id }, ctx) {
    const user = await ctx.prisma.user.findOne({ where: { id } })
    if (user) return user
    throw new Error('User not found')
  }
})
