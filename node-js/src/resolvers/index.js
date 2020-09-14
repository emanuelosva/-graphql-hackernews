/**
 * @fileoverview Resolvers
 */

const { linkMutations } = require('./mutations')
const { linkQuerys } = require('./querys')

module.exports = {
  linkMutations,
  linkQuerys
}