module.exports = {
  config: {
    resourceName: {
      type: 'string',
    },
  },
  props: {
    id: {
      type: 'string',
    },
    data: {
      id: {
        type: 'string',
      },
    },
  },
  endpoints: {
    createResult: {
      after: 'create',
      args: ['data'],
    },
    get: {
      before: 'get',
      args: ['id'],
    },
  },
}
