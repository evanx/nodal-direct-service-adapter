module.exports = endpoints =>
  Object.entries(endpoints)
    .map(([key, endpoint]) => Object.assign({ key }, endpoint))
    .reduce((res, endpoint) => {
      res[endpoint.key] = endpoint
      return res
    }, {})
