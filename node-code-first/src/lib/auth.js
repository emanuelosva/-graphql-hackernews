/**
 * ************************
 * @fileoverview Auth utils
 * ************************
 */

const jwt = require('jsonwebtoken')

module.exports.getToken = async ({ email }) => jwt.sign({ email }, 'secret')

module.exports.getAuthUser = async (context) => {
  try {
    const Authorization = context.request.get('Authorization')
    if (!Authorization) return Promise.reject(new Error('Not authenticated'))

    const token = Authorization.replace('Bearer', '')
    const { email } = jwt.verify(token, 'secret')

    const user = await context.prisma.user.findOne({ where: { email } })
    if (!user) return Promise.reject(new Error('Invalid credential'))

    return user
  } catch (error) {
    return Promise.reject(new Error('Invalid credential'))
  }
}
