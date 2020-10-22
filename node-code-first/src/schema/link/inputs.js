/**
 * *************************
 * @fileoverview Link inputs
 * *************************
 */

const { inputObjectType, enumType } = require('@nexus/schema')

const sortEnum = enumType({
  name: 'Sort',
  description: "Valid sort key words",
  members: ['asc', 'desc']
})

module.exports.inputOrderBy = inputObjectType({
  name: 'inputOrderBy',
  description: "Sample input for order feed",
  definition(t) {

    t.field('description', {
      type: sortEnum,
      required: false,
      description: "Order by description?"
    })

    t.field('url', {
      type: sortEnum,
      required: false,
      description: "Order by url?",
    })

    t.field('createdAt', {
      type: sortEnum,
      required: false,
      description: "Order by creation?",
    })
  }
})
