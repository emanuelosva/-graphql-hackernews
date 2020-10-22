/**
 * **********************************
 * @fileoverview User type definition
 * **********************************
 */

const { objectType } = require('@nexus/schema')

module.exports.User = objectType({
  name: 'User',
  description: 'The user entitie',

  definition(t) {
    t.id('id', {
      nullable: false,
      description: 'User pk'
    })

    t.string('name', {
      nullable: false,
      description: 'User full name'
    })

    t.string('email', {
      nullable: false,
      description: 'User email address'
    })

    t.list.field('links', {
      type: 'Link',
      nullable: false,
      description: 'User posted links',
      async resolve(parent, args, ctx) {
        return ctx.prisma.user.findOne({ where: { id: parent.id } }).links()
      }
    })
  }
})

module.exports.AuthResponse = objectType({
  name: 'AuthResponse',
  description: 'Special response on auth GQL actions (signup & login)',

  definition(t) {
    t.string('token', {
      nullable: false,
      description: 'Encode JWT for authentication'
    })

    t.field('user', {
      type: 'User',
      nullable: false,
      description: 'Logged or register user'
    })
  }
})
