// redis.test.js implemtend a mocked redis interface

const data = {
  key: 'testing',
};

module.exports.mockRedis = {
  get: (id) => Promise.resolve(data[id]),
  set: () => Promise.resolve(),
};
