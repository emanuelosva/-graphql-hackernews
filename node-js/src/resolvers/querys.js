/**
 * @fileoverview Query Resolvers
 */


/**
 * Querys aboutn Links
 */
export const linkQuerys = {

  // Return app info
  info: () => 'This is the API-GRAPHQL of a Hackersnews clone',

  // Return all Links
  feed: () => null,

  // Fetch a link by id
  link: (parent, args) => null,
}
