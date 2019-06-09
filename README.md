# nodal-mlk

We propose a convention for declaring a Node service to achieve:

- a documented API with examples
- test coverage via the examples
- enable simple services within a monolith
- enable reconfiguration as distributed microservices

## Examples

### Simple cache

See https://github.com/evanx/nodal-mlk/blob/master/examples/simple-cache

Consider an in-memory caching service:

```
const cache = new Map()

exports.remove = async id => {
  if (!cache.has(id)) {
    throw new NotFound(id)
  }
  return cache.delete(id)
}
```

We declare `examples` for each function:

```
exports.endpoints = {
  remove: {
    examples: {
      test1: {
        ...
      },
    },
  },
```

#### Setup and expect

Consider the following example to `remove` an item from the cache:

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

These functions are implemented in our Simple Cache service as follows:

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

## Status

- test runner - WIP June 2019
- HTTP adapter - TBD
- NATS adapter - TBD
- GraphQL adapter - TBD
