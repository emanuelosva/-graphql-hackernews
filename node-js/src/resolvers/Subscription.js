/**
 * ************************************
 * @fileoverview Subscription Resolvers
 * ************************************
 */

const { pubsubEvents } = require('./pubSubEvents')

const newLinkSubscribe = (parent, args, context) => {
  return context.pubsub.asyncIterator(pubsubEvents.newLink)
}

module.exports.newLink = {
  subscribe: newLinkSubscribe,
  resolve: (payload) => payload
}

const removeLinkSubscribe = (parent, args, context) => {
  return context.pubsub.asyncIterator(pubsubEvents.removeLink)
}

module.exports.removeLink = {
  subscribe: removeLinkSubscribe,
  resolve: (payload) => payload
}
