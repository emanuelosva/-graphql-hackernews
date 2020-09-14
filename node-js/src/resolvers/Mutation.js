/**
 * @fileoverview Mutations Resolvers
 */

const bycrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config')
const { getCurrentUser } = require('../lib/auth')

/**
 * Signup - Register a new user
 */
module.exports.signup = async (parent, args, context, info) => {
  const { email, password, name } = args

  const existingUser = await context.prisma.user.findOne({ where: { email } })
  if (existingUser) return Promise.reject(new Error('Email already exists'))

  const hashedPassword = await bycrypt.hash(password, 10)
  const user = await context.prisma.user.create({
    data: { email, name, password: hashedPassword },
  })

  const token = jwt.sign({ userId: user.id }, config.auth.secret)
  return { user, token }
}

/**
 * Login a user
 */
module.exports.login = async (parent, args, context) => {
  const { email, password } = args

  const user = await context.prisma.user.findOne({ where: { email } })
  if (!user) return Promise.reject(new Error('Invalid Credentials'))

  const correctPassword = await bycrypt.compare(password, user.password)
  if (!correctPassword) return Promise.reject(new Error('Invalid Credentials'))

  const token = jwt.sign({ userId: user.id }, config.auth.secret)
  return { user, token }
}

/**
 * Add new Link
 */
module.exports.postLink = async (parent, args, context) => {
  const user = await getCurrentUser(context)
  const { url, description } = args

  const newLink = await context.prisma.link.create({
    data: { url, description, postedBy: { connect: { id: user.id } } },
  })
  return newLink
}

/**
 * Update a existing Link
 */
module.exports.updateLink = async (parent, args, context) => {
  // Only as a authentication middleware
  await getCurrentUser(context)

  const { id, url, description } = args

  const updatedLink = await context.prisma.link.update({
    where: { id },
    data: { url, description },
  })
  return updatedLink
}

/**
 * Delete a existing Link
 */
module.exports.deleteLink = async (parent, args, context) => {
  // Only as a authentication middleware
  await getCurrentUser(context)

  const { id } = args

  const deletedLink = await context.prisma.link.delete({ where: { id } })
  return deletedLink
}
