/**
 * ************************
 * @fileoverview GQL Schema
 * ************************
 */

const { join } = require('path')
const { makeSchema } = require('@nexus/schema')
const { userTypes, userQuery, userMutation } = require('./user')

const Types = {
  ...userTypes,
}

const Query = {
  ...userQuery,
}

const Mutation = {
  ...userMutation,
}

module.exports.schema = makeSchema({
  types: [Types, Query, Mutation],
  outputs: {
    schema: join(__dirname, '../schema.graphql')
  }
})
