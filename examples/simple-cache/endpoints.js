module.exports = {
  clear: {
    method: 'delete',
    examples: {
      test1: {
        setup: {
          cache: [
            {
              id: '101',
              name: '101st',
            },
          ],
        },
        expect: {
          cache: [],
        },
      },
    },
  },
  create: {
    method: 'post',
    args: ['data'],
    examples: {
      test1: {
        input: {
          data: {
            id: '101',
            name: '101st',
          },
        },
        result: {
          id: '101',
          name: '101st',
        },
        expect: {
          cache: [
            {
              id: '101',
              name: '101st',
            },
          ],
        },
      },
    },
  },
  get: {
    method: 'get',
    args: ['id'],
    examples: {
      test1: {
        setup: {
          cache: [
            {
              id: '101',
              name: '101st',
            },
          ],
        },
        input: {
          id: '101',
        },
        result: {
          id: '101',
          name: '101st',
        },
      },
    },
  },
  find: {
    method: 'get',
    stream: 'iterator',
  },
  replace: {
    method: 'put',
  },
  update: {
    method: 'patch',
    args: ['id', 'data'],
  },
  remove: {
    method: 'delete',
    args: ['id'],
    examples: {
      test1: {
        setup: {
          cache: [
            {
              id: '101',
              name: '101st',
            },
          ],
        },
        input: {
          id: '101',
        },
        expect: {
          cache: [],
        },
      },
      test2: {
        setup: {
          cache: [
            {
              id: '101',
              name: '101st',
            },
            {
              id: '102',
              name: '102nd',
            },
          ],
        },
        input: {
          id: '102',
        },
        expect: {
          cache: [
            {
              id: '101',
              name: '101st',
            },
          ],
        },
      },
    },
  },
}
