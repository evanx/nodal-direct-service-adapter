const adapter = require('.')
const simpleCacheImpl = require('../../examples/simple-cache')

describe('direct service adapter', () => {
  it('should adapt simple cache service', () => {
    const service = adapter(simpleCacheImpl)
  })
})
