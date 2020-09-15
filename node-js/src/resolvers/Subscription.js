/**
 * ************************************
 * @fileoverview Subscription Resolvers
 * ************************************
 */

const { pubsubEvents } = require('./pubSubEvents')

/**
 * PubSub - On create Link
 */
const newLinkSubscribe = (parent, args, context) => {
  return context.pubsub.asyncIterator(pubsubEvents.newLink)
}

module.exports.newLink = {
  subscribe: newLinkSubscribe,
  resolve: (payload) => payload
}

/**
 * PubSub - On deleted Link
 */
const removeLinkSubscribe = (parent, args, context) => {
  return context.pubsub.asyncIterator(pubsubEvents.removeLink)
}

module.exports.removeLink = {
  subscribe: removeLinkSubscribe,
  resolve: (payload) => payload
}

/**
 * PubSub - On new Vote
 */
const newVoteSubscribe = (parent, args, context) => {
  return context.pubsub.asyncIterator(pubsubEvents.newVote)
}

module.exports.newVote = {
  subscribe: newVoteSubscribe,
  resolve: (payload) => payload
}
