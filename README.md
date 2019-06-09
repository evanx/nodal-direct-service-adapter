# nodal-mlk

We propose a convention for declaring a modular Node service to:

- provide a documented API with examples
- ensure test coverage via the examples
- support simple services within a monolith
- ease reconfiguration as distributed microservices
- support middleware for common concerns e.g. authorisation, monitoring, caching

## Status

- test runner - WIP June 2019
- monitoring - TBD
- authorisation - TBD
- caching - TBD
- HTTP adapter - TBD June 2019
- NATS adapter - TBD
- GraphQL adapter - TBD

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

To facilitate testing, we implement `setup` and `expect` on our Simple Cache service:

```
exports.setup = async config => {
  cache.clear()
  config.cache.forEach(item => {
    cache.set(item.id, item)
  })
}

exports.expect = async state => {
  assert.strictEqual(cache.size, state.cache.length, 'cache.size')
  state.cache.forEach(item => {
    const value = cache.get(item.id)
    assert.deepStrictEqual(item, value, item.id)
  })
}
```

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

Our automated test runner will invoke `setup` and finally `expect` on the service using the above declarations e.g. for the contents of the `cache` and the `id` to `remove.`

--
https://twitter.com/evanxsummers
