const adapter = require('.')
const simpleCacheImpl = require('.')
const validateService = require('../../adapters/common/validate-service')

describe('simple cache', () => {
  it('should validate', async () => {
    await validateService(simpleCacheImpl)
  })
})
