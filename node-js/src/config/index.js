/**
 * **********************
 * @fileoverview Settings
 * **********************
 */

require('dotenv').config()

module.exports = {
  app: {
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT | 3000,
  },
  auth: {
    secret: process.env.SECRET || 'devSecret',
  },
}
