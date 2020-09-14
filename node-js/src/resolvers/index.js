/**
 * @fileoverview Resolvers
 */

const { linkMutations } = require('./mutations')
const { linkQuerys } = require('./querys')


/**
 * GQL Resolvers
 */
module.exports.resolvers = {
  // QUERYS
  Query: {
    ...linkQuerys,
  },

  // MUTATIONS
  Mutation: {
    ...linkMutations,
  },
}
