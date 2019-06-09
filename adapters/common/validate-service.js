const validateEndpoint = require('./validate-endpoint')
const { monitorFactory } = require('../../utils')
const monitorParent = monitorFactory({ key: 'validateService' })

module.exports = async service => {
  const monitor = monitorParent.child({ key: service.key })
  const endpoints = Object.entries(service.endpoints).map(([key, endpoint]) =>
    Object.assign({ key }, endpoint),
  )
  for (let endpoint of endpoints) {
    try {
      await validateEndpoint({
        monitor: monitor.child({
          key: endpoint.key,
        }),
        service,
        endpoint,
      })
    } catch (err) {
      throw new Error(`${endpoint.key}: ${err.message}`)
    }
  }
}
