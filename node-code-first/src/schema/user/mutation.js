/**
 * ****************************
 * @fileoverview User mutations
 * ****************************
 */

const bcrypt = require('bcrypt')
const { mutationField, stringArg } = require('@nexus/schema')
const { auth } = require('../../lib')

module.exports.signupMutation = mutationField('signup', {
  type: 'AuthResponse',
  description: 'Register a new user and return access token',
  args: {
    name: stringArg({ required: true }),
    email: stringArg({ required: true }),
    password: stringArg({ required: true })
  },
  async resolve (_, { name, email, password }, ctx) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10)
      const user = ctx.prisma.user.create({
        data: {
          name, email, password: hashedPassword
        }
      })
      const token = auth.getToken({ email })
      return { user, token }
    } catch (error) {
      throw new Error(error)
    }
  }
})

module.exports.loginMutation = mutationField('login', {
  type: 'AuthResponse',
  description: 'Verify user credentials and return access token',
  args: {
    email: stringArg({ required: true }),
    password: stringArg({ required: true })
  },
  async resolve (_, { email, password }, ctx) {
    try {
      const user = await ctx.prisma.user.findOne({ where: { email } })
      if (!user) throw new Error('Invalid credentials')

      const correctPassword = await bcrypt.compare(password, user.password)
      if (!correctPassword) throw new Error('Invalid credentials')

      const token = auth.getToken({ email })
      return { user, token }
    } catch (error) {
      throw new Error(error)
    }
  }
})
