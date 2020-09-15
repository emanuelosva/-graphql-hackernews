/**
 * *******************************
 * @fileoverview Vote -  Resolvers
 * *******************************
 */


/**
 * Resolve the `link` field. Fecth the related Link
 */
module.exports.link = (parent, args, context) => {
  return context.prisma.vote.findOne({ where: { id: parent.id } }).link()
}

/**
 * Resolve the `user` field. Fecth the related User
 */
module.exports.user = (parent, args, context) => {
  return context.prisma.vote.findOne({ where: { id: parent.id } }).user()
}
