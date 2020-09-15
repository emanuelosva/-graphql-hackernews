/**
 * ********************************************
 * @fileoverview Request Logger middleware
 * @description Log the request operation info
 * ********************************************
 */

const ckalk = require('chalk')
const debug = require('debug')('app:GQL-Request')


const getOpeartionColor = (operation) => {
  if (operation === 'query') return chalk.yellowBright(operation)
  if (operation === 'mutation') return chalk.blueBright(operation)
  if (operation === 'subscription') return chalk.magentaBright(operation)
  return chalk.redBright(operation)
}

module.exports.requestLogger = async (resolve, parent, args, context, info) => {

  // Log the request info
  const { operation } = info
  const { fieldName } = info

  const typeOperation = getOpeartionColor(operation.operation)
  const name = ckalk.greenBright(fieldName)

  debug('Request', `Type: ${typeOperation} - Name: ${name}`)

  // Return the resolver
  return await await resolve(parent, args, context, info)
}
