const assert = require('assert')

module.exports = (name, value) => ({
  type(type) {
    assert.strictEqual(typeof value, type, name)
  },
})
