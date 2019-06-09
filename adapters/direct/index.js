const validateEndpoint = require('../common/validate-endpoint')
const createEndpoint = require('./create-endpoint')
const { monitorFactory } = require('../../utils')
const monitorParent = monitorFactory({ key: 'adapters.direct' })

module.exports = async service => {
  const monitor = monitorParent.child({ key: service.key })
  const endpoints = Object.entries(service.endpoints).map(([key, endpoint]) =>
    Object.assign({ key }, endpoint),
  )
  const res = endpoints.reduce((res, endpoint) => {
    res[endpoint.key] = createEndpoint({ service, endpoint })
    return res
  }, {})
  return res
}
