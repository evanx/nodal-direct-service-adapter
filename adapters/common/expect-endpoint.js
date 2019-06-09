const assert = require('assert')

module.exports = async ({ monitor, service, endpoint, example }) => {
  if (example.setup) {
    await service.setup(example.setup)
  }
  const args = !example.input
    ? []
    : !endpoint.args
    ? [example.input]
    : endpoint.args.map(arg => example.input[arg])
  try {
    const res = await service[endpoint.key](...args)
    monitor.debug({
      serviceKey: service.key,
      endpointKey: endpoint.key,
      args,
      res,
    })
    if (example.result) {
      assert.deepStrictEqual(res, example.result, 'result')
    }
  } catch (err) {
    if (example.error) {
      assert.deepStrictEqual(res, example.error, 'error')
    } else {
      throw err
    }
  }
  if (example.expect) {
    await service.expect(example.expect)
  }
}
