/**
 * @fileoverview Mutations Resolvers
 */


/**
 * Operations about Links
 */

module.exports.linkMutations = {

  postLink: async (parent, args, context) => {
    const { url, description } = args
    const newLink = await context.prisma.link.create({
      data: { url, description },
    })
    return newLink
  },

  updateLink: async (parent, args, context) => {
    const { id, url, description } = args
    const updatedLink = await context.prisma.link.update({
      where: { id },
      data: { url, description },
    })
    return updatedLink
  },

  deleteLink: async (parent, args, context) => {
    const { id } = args
    const deletedLink = await context.prisma.link.delete({ where: { id } })
    return deletedLink
  },
}
