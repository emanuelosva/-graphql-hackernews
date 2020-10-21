/**
 * *************************
 * @fileoverview Context GQL
 * *************************
 */

const { PrismaClient } = require('@prisma/client')
const { auth } = require('./lib')

module.exports.createContext = async ({ req }) => {
  const authorization = req.headers.authorization || ''
  const token = authorization.replace('Bearer ', '')
  const user = await auth.getAuthUser(token)

  return {
    prisma: new PrismaClient(),
    user
  }
}
