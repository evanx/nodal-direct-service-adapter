const assert = require('assert')

function create(options) {
  assert(options.key, 'options.key')
  return Object.assign({}, options, {
    debug(context, text) {
      if (text) {
        console.debug(options.key, text, context)
      } else {
        console.debug(options.key, context)
      }
    },
    info(context, text) {
      if (text) {
        console.log(options.key, text, context)
      } else {
        console.log(options.key, context)
      }
    },
    warn(context, text) {
      if (text) {
        console.warn(options.key, text, context)
      } else {
        console.warn(options.key, context)
      }
    },
    error(context, text) {
      if (text) {
        console.error(options.key, text, context)
      } else {
        console.error(options.key, context)
      }
    },
    child(opts) {
      assert(opts.key, 'child.key')
      opts.key = [options.key, opts.key].join('.')
      return create(opts)
    },
  })
}

module.exports = create
