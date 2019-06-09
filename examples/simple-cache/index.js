const assert = require('assert')
const { NotFound, Conflict } = require('@feathersjs/errors')
const { createId } = require('../../utils')

const config = {
  resourceType: 'item',
}
const cache = new Map()

exports.endpoints = require('./endpoints')
exports.key = 'simpleCache'

exports.configure = async conf => Object.assign(config, conf)

exports.setup = async state => {
  cache.clear()
  assert(Array.isArray(state.cache), 'cache')
  state.cache.forEach(item => {
    assert.strictEqual(typeof item, 'object', 'item')
    assert.strictEqual(typeof item.id, 'string', 'id')
    cache.set(item.id, item)
  })
}

exports.expect = async state => {
  assert(Array.isArray(state.cache), 'cache:Array')
  assert.strictEqual(cache.size, state.cache.length, 'cache.size')
  state.cache.forEach(item => {
    assert.strictEqual(typeof item, 'object', 'item')
    assert.strictEqual(typeof item.id, 'string', 'id')
    const value = cache.get(item.id)
    assert(typeof value, 'object', item.id)
    assert.deepStrictEqual(item, value, item.id)
  })
}

exports.clear = async () => {
  cache.clear()
}

exports.get = async id => {
  assert(id, 'id')
  if (!cache.has(id)) {
    throw new NotFound(`Cannot find ${config.resourceType} with id: ${id}`)
  }
  return cache.get(id)
}

exports.find = async fn => {
  const iter = cache.entries()
  return {
    next: () => {
      while (true) {
        const { done, value } = iter.next()
        if (done) {
          if (value !== undefined && fn(value)) {
            return { done, value }
          } else {
            return { done }
          }
        } else if (fn(value)) {
          return { done, value }
        }
      }
    },
  }
}

exports.remove = async id => {
  if (!cache.has(id)) {
    throw new NotFound(`Cannot find ${resourceType} with id: ${id}`)
  }
  return cache.delete(id)
}

exports.create = async data => {
  if (!data.id) {
    data.id = createId()
  } else {
    assert(typeof data.id, 'string', 'id')
  }
  const { id } = data
  if (cache.has(id)) {
    throw new Conflict(
      `Cannot create ${config.resourceType} as already exists: ${id}`,
    )
  }
  cache.set(id, data)
  return data
}

exports.update = async (id, data) => {
  assert(id, 'id')
  const stored = exports.get(id)
  const result = Object.assign(stored, data)
  cache.set(id, result)
  return result
}
