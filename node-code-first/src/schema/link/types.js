/**
 * ***********************************
 * @fileoverview Link types definition
 * ***********************************
 */

const { objectType } = require('@nexus/schema')

module.exports.Link = objectType({
  name: 'Link',
  description: 'The linkt to some rosource shared to comunity',
  definition(t) {

    t.id('id', {
      nullable: false,
      description: 'Link pk'
    })

    t.string('description', {
      nullable: false,
      description: 'Link description'
    })

    t.string('url', {
      nullable: false,
      description: 'Url to the shared link'
    })

    t.string('createdAt', {
      nullable: true,
      description: 'Link creation date'
    })

    t.string('updatedAt', {
      nullable: true,
      description: 'Link update date'
    })

    t.field('postedBy', {
      type: 'User',
      nullable: true,
      resolve(parent, args, ctx) {
        return ctx.prisma.link.findOne({ where: { id: parent.id } }).postedBy()
      }
    })

    t.list.field('votes', {
      type: 'Vote',
      nullable: false,
      resolve(parent, args, ctx) {
        return ctx.prisma.link.findOne({ where: { id: parent.id } }).votes()
      }
    })
  }
})

module.exports.Feed = objectType({
  name: 'Feed',
  description: 'Feed response info',
  definition(t) {

    t.int('count', {
      nullable: false,
      description: 'Link count'
    })

    t.list.field('links', {
      type: 'Link',
      nullable: false,
      description: 'User links'
    })
  }
})

module.exports.Vote = objectType({
  name: 'Vote',
  description: 'Represent a vote for some link',
  definition(t) {

    t.field('Link', {
      type: 'Link',
      nullable: false,
      description: 'The voted link',
      async resolve(parent, args, ctx) {
        return ctx.prisma.vote.findOne({ where: { id: parent.id } }).link()
      }
    })

    t.field('user', {
      type: 'User',
      nullable: false,
      description: 'The user that emit a vote',
      async resolve(parent, args, ctx) {
        return ctx.prisma.vote.findOne({ where: { id: parent.id } }).user()
      }
    })
  }
})
