/**
 * @fileoverview Resolvers
 */

const { linkMutations } = require('./mutations')
const { linkQuerys } = require('./querys')


/**
 * GQL Resolvers
 */
export const resolvers = {
  // QUERYS
  Query: {
    ...linkQuerys,
  },

  // MUTATIONS
  Mutation: {
    ...linkMutations,
  },
}
