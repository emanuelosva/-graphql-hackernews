/**
 * @fileoverview Auth tools
 */

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../../config')


/**
 * Get the request current user
 * 
 * @description Return the user data if the request token
 * is valid and user exists. Else return a Error
 * 
 * @param {object} context - GQL Resolver context
 */
module.exports.getCurrentUser = async (context) => {
  try {
    const Authorization = context.request.get('Authorization')
    if (!Authorization) return Promise.reject(new Error('Not authenticated'))

    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, config.auth.secret)

    const user = await context.prisma.user.findOne({ where: { id: userId } })
    if (!user) return Promise.reject(new Error('Invalid credential'))

    return user
  } catch (error) {
    return Promise.reject(new Error('Invalid credential'))
  }
}
