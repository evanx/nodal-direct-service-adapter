const expectEndpoint = require('./expect-endpoint')

module.exports = async ({ monitor, service, endpoint }) => {
  if (endpoint.examples) {
    for (let key in endpoint.examples) {
      const example = endpoint.examples[key]
      example.key = key
      const child = monitor.child({
        key: example.key,
      })
      try {
        await expectEndpoint({
          monitor: child,
          service,
          endpoint,
          example,
        })
      } catch (err) {
        err.message = `${child.key}: ${err.message}`
        throw err
      }
    }
  }
}
