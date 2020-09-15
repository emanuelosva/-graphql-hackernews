/**
 * @fileoverview Resolver nested Link
 */


/**
 * Resolve the `postedBy` field. Fecth the related User
 */
module.exports.postedBy = (parent, args, context) => {
  return context.prisma.link.findOne({ where: { id: parent.id } }).postedBy()
}

/**
 * Resolve the `votes` field. Fecth the related Vote[]
 */
module.exports.votes = (parent, args, context) => {
  return context.prisma.link.findOne({ where: { id: parent.id } }).votes()
}
