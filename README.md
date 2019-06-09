# nodal-mlk

We propose a convention for declaring a Node service to achieve:

- a documented API with examples
- test coverage via the examples
- enable simple services within a monolith
- enable distributed "microservices"

## Examples

### Simple cache

See https://github.com/evanx/nodal-mlk/blob/master/examples/simple-cache

Consider an in-memory caching service:

```
const cache = new Map()
...
exports.remove = async id => {
  if (!cache.has(id)) {
    throw new NotFound(`Cannot find ${config.resourceName} with id: ${id}`)
  }
  return cache.delete(id)
}
```

We declare `examples`

```
module.exports = {
  remove: {
    examples: {
      test1: {
        ...
      },
    },
  },
  ...
```

#### Setup and expect

Consider the following example to `clear` the cache:

```
  remove: {
    examples: {
      test1: {
        setup: {
          cache: [
            {
              id: '101',
              name: '101st',
            },
          ],
        },
        input: {
          id: '101',
        },
        expect: {
          cache: [],
        },
      },
    },
  },
```

Our automated test runner will invoke `setup` and `expect` on the service using the above declarations.

```
exports.setup = async config => {
  cache.clear()
  config.cache.forEach(item => {
    cache.set(item.id, item)
  })
}

exports.expect = async state => {
  state.cache.forEach(item => {
    const value = cache.get(item.id)
    assert.deepStrictEqual(item, value, item.id)
  })
}
```

#### Expect

where our service must implement `setup` and `expect` functions to facilitate tests:

```
exports.setup = async config => {
  cache.clear()
  config.cache.forEach(item => {
    cache.set(item.id, item)
  })
}

exports.expect = async state => {
  state.cache.forEach(item => {
    const value = cache.get(item.id)
    assert.deepStrictEqual(item, value, item.id)
  })
}
```

When the exer
