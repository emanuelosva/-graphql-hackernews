/**
 * ************************
 * @fileoverview GQL Schema
 * ************************
 */

const { join } = require('path')
const { makeSchema } = require('@nexus/schema')
const { userTypes, userQuery, userMutation } = require('./user')
const { linkTypes, linkQuery, linkMutation } = require('./link')

const Types = {
  ...userTypes,
  ...linkTypes
}

const Query = {
  ...userQuery,
  ...linkQuery
}

const Mutation = {
  ...userMutation,
  ...linkMutation
}

module.exports.schema = makeSchema({
  types: [Types, Query, Mutation],
  outputs: {
    schema: join(__dirname, '../schema.graphql')
  }
})
