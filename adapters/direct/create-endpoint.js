const assert = require('assert')

module.exports = ({ service, endpoint }) => {
  const fn = service[endpoint.key]
  return (...args) => {
    return fn(args)
  }
}
