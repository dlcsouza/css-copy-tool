global.chrome = {
  runtime: {
    sendMessage: jest.fn(),
    onMessage: { addListener: jest.fn() }
  },
  tabs: {
    query: jest.fn((opts, cb) => cb([{ id: 1, url: 'https://example.com' }])),
    sendMessage: jest.fn()
  },
  storage: {
    local: {
      get: jest.fn((k, cb) => cb({})),
      set: jest.fn((v, cb) => cb && cb())
    }
  },
  commands: {
    onCommand: { addListener: jest.fn() }
  }
};
