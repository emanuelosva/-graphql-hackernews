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
      resolve(root, args, ctx) {
        return ctx.prisma.link.findOne({ where: { id: root.id } }).postedBy()
      }
    })

    t.list.field('votes', {
      type: 'Vote',
      nullable: true,
      resolve(root, args, ctx) {
        return ctx.prisma.link.findOne({ where: { id: root.id } }).votes()
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
      nullable: false,
      description: 'User links'
    })
  }
})

module.exports.Vote = objectType({
  name: 'Vote',
  description: 'Represent a vote for some link',
  definition(t) {

    t.field('link', {
      nullable: false,
      description: 'The voted link'
    })

    t.field('user', {
      nullable: false,
      description: 'The user that emit a vote'
    })
  }
})
