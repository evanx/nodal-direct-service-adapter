const redis = require('redis')

exports.createId = Math.random()
  .toString()
  .slice(2)

exports.monitorFactory = require('../monitor')

exports.invokeAsync = fn =>
  new Promise((resolve, reject) =>
    fn((err, result) => (err ? reject(err) : resolve(result))),
  )

exports.createRedisClient = redisConfig => redis.createClient(redisConfig)

exports.quitRedisAsync = redisClient =>
  exports.invokeAsync(cb => redisClient.quit(cb))

exports.redisAsync = (redisClient, [command, ...args]) =>
  exports.invokeAsync(cb => redisClient.sendCommand(command, args, cb))

exports.multiAsync = (redisClient, commands, monitor) =>
  new Promise((resolve, reject) =>
    redisClient.multi(commands).exec((err, res) => {
      if (monitor) {
        monitor.debug({ commands, err, res }, 'redis:multiAsync')
      }
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    }),
  )
