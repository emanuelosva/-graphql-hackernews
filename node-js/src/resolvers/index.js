/**
 * @fileoverview Resolvers
 */

const Mutations = require('./Mutation')
const Querys = require('./Query')


/**
 * GQL Resolvers
 */
module.exports.resolvers = {
  // QUERYS
  Query: {
    ...Querys,
  },

  // MUTATIONS
  Mutation: {
    ...Mutations,
  },
}
