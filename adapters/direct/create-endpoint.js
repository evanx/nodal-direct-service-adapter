const assert = require('assert')

module.exports = ({ service, endpoint, hook }) => {
  const fn = service[endpoint.key]
  return (...args) => {
    if (hook) {
      const context = { endpoint, args }
      await hook(context)
      if (context.result) {
        return context.result
      }
    }
    return fn(args)
  }
}
