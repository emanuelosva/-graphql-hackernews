/**
 * @fileoverview Resolver nested User
 */


/**
 * Resolve the `links` field. Fecth the related Links
 */
module.exports.links = (parent, args, context) => {
  return context.prisma.user.findOne({ where: { id: parent.id } }).links()
}
