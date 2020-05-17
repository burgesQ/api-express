// redis.js

// TODO: interface transition controller / redis (like an ORM)
// TODO: pipe action like :
// - getAll : KEYS, HGETALL
// - delete : HKEYS, HDELp

const methods = {};

function toInt(payload) {
  if (payload.some_int !== undefined)
    payload.some_int = parseInt(payload.some_int, 10);

  return payload;
}

methods.getOneData = async (redis, id) => {
  return toInt(await redis.hgetall(id));
};

methods.getAllData = async (redis) => {
  const ids = await redis.keys('*'),
        data = [];

  // TODO: pipe this.redis call
  for (const i in ids) {
    const id = ids[i];
    data.push(toInt(await redis.hgetall(id)));
  }

  return data;
};

methods.remove = async (redis, id, toRemove) => {
  const fields = await redis.hkeys(id),
        size = toRemove.length;

  for (const field of fields)
    if (!size || toRemove.indexOf(field) > -1)
      await redis.hdel(id, field);
};

//  getAllData: () => {}

module.exports = methods;
//  createData: (redis) => {};

//};
