/**
 * ****************************
 * @fileoverview Link mutations
 * ****************************
 */

const { mutationField, stringArg, idArg } = require('@nexus/schema')
const user = require('../user')

module.exports.postLinkMutation = mutationField('postLink', {
  type: 'Link',
  nullable: false,
  description: 'Create a new link to share.',
  args: {
    url: stringArg({ required: true }),
    description: stringArg({ required: true })
  },
  async resolve(_, { url, description }, ctx) {
    const user = ctx.user
    if (!user) throw new Error('Not logged in')

    const newLink = ctx.prisma.link.create({
      data: { url, description, postedBy: { connect: { id: user.id } } },
    })

    return newLink
  }
})

module.exports.updateLinkMutation = mutationField('updateLink', {
  type: 'Link',
  nullable: false,
  description: 'Update a existing link',
  args: {
    id: idArg({ required: true }),
    url: stringArg({ required: false }),
    description: stringArg({ required: false })
  },
  async resolve(_, { id, url, description }, ctx) {
    if (!ctx.user) throw new Error('Not logged in')

    const updatedLink = ctx.prisma.link.update({
      where: { id },
      data: { url, description }
    })

    return updatedLink
  }
})

module.exports.deleteLinkMutation = mutationField('deleteLink', {
  type: 'Link',
  nullable: false,
  description: 'Delete a existing link',
  args: {
    id: idArg({ required: true })
  },
  async resolve(_, { id }, ctx) {
    if (!ctx.user) throw new Error('Not logged in')

    const deletedLink = ctx.prisma.link.delete({ where: { id } })

    return deletedLink
  }
})

module.exports.addVoteMutation = mutationField('addVote', {
  type: 'Vote',
  description: "Emit a new vote for a specific link",
  args: {
    linkId: idArg({ required: true })
  },
  async resolve(_, { linkId }, ctx) {
    if (!ctx.user) throw new Error('Not logged in')
    const userId = ctx.user.id

    const voteExists = await ctx.prisma.vote.findOne({
      where: { linkId_userId: { linkId, userId } }
    })
    if (voteExists) throw new Error('Already voting for this link')

    const newVote = await ctx.prisma.vote.create({
      data: {
        user: { connect: { id: userId } },
        link: { connect: { id: linkId } },
      }
    })

    return newVote
  }
})
