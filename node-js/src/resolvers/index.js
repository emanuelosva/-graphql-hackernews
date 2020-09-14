/**
 * @fileoverview Resolvers
 */

const Mutation = require('./Mutation')
const Query = require('./Query')
const User = require('./User')
const Link = require('./Link')


/**
 * GQL Resolvers
 */
module.exports.resolvers = {
  Mutation,
  Query,
  User,
  Link,
}
