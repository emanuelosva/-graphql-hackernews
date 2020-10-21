/**
 * ************************
 * @fileoverview Auth utils
 * ************************
 */

const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')


module.exports.getToken = async ({ email }) => jwt.sign({ email }, 'secret')

module.exports.getAuthUser = async (token) => {
  try {
    if (!token) return false

    const { email } = jwt.verify(token, 'secret')

    const prisma = new PrismaClient()
    const user = await prisma.user.findOne({ where: { email } })
    if (!user) return false
    return user
  } catch (error) {
    return false
  }
}
