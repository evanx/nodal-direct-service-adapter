const assert = require('assert')
const { redisAsync } = require('../../utils')
const { NotFound, Conflict } = require('@feathersjs/errors')

module.exports = async ({ redisClient, monitor, service, config }) => ({
  async createResult(data) {
    await redisAsync(redisClient, [
      'setex',
      `${config.resourceName}:${data.id}:j`,
      JSON.stringify(data),
    ])
  },
  async get(id) {
    const result = await redisAsync(redisClient, [
      'get',
      `${config.resourceName}:${id}:j`,
    ])
    if (result) {
      return { result: JSON.parse(result) }
    }
  },
})
