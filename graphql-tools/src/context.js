/**
 * *************************
 * @fileoverview Context GQL
 * *************************
 */

const { PrismaClient } = require('@prisma/client')

module.exports.createContext = () => {
  return {
    prisma: new PrismaClient()
  }
}
