/**
 * **************************
 * @fileoverview User queries
 * **************************
 */

const { queryField, stringArg } = require('@nexus/schema')

module.exports.getUserQuery = queryField('user', {
  type: 'User',
  description: 'Return the user that matches the passed id.',
  args: {
    id: stringArg({ required: true })
  },
  async resolve (_, { id }, ctx) {
    console.log(ctx)
    const user = await ctx.prisma.user.findOne({ where: { id } })
    if (user) return user
    throw new Error('User not found')
  }
})

module.exports.getCurrentUserQuery = queryField('currentUser', {
  type: 'User',
  description: 'Return the current logged user.',
  args: {},
  async resolve (_, args, ctx) {
    if (!ctx.user) throw new Error('Not loggedIn')
    return ctx.user
  }
})
