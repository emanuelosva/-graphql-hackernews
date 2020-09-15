/**
 * @fileoverview Resolvers
 */

const Mutation = require('./Mutation')
const Query = require('./Query')
const User = require('./User')
const Link = require('./Link')
const Vote = require('./Vote')
const Subscription = require('./Subscription')


/**
 * GQL Resolvers
 */
module.exports.resolvers = {
  Mutation,
  Query,
  User,
  Link,
  Vote,
  Subscription,
}
