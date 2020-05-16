// credential.js hold the credential endpoint

 controller = {},
      redis = {};


// generate a not found error (404)
function newNotfound(msg) {
  const err = new Error(msg);
  err.status = 404;
  throw err;
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

// use set the redis client
controller.use = (client) => {
  redis = client;
};

/**
 * @swagger
 * tags:
 *   name: Data
 *   description: data management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Data:
 *       type: object
 *       required:
 *         - id
 *         - data
 *       properties:
 *         id:
 *           type: string
 *           description: ID linked to the data
 *         data:
 *           type: string
 *           description: ID's data
 *       example:
 *         id: 1234
 *         data: tutu
 *
 *     Error:
 *       type: object
 *       required:
 *         - error
 *       properties:
 *         error:
 *           type: string
 *           description: Error message
 *       example:
 *         error: No such ressources
 */

/**
 * @swagger
 * definitions:
 *   Data:
 *     schema:
 *       $ref: '#/components/schemas/Data'
 *   Error:
 *     schema:
 *       $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/v1/data/:id:
 *   get:
 *     description: Request id's data
 *     tags: [Data]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: pretty
 *         description: Return a pretty json
 *         in: query
 *         required: false
 *         type: bool
 *     responses:
 *       200:
 *         description: id's data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Data'
 *             example:
 *               id: new_data
 *               data: new_value
 *       404:
 *         description: no data found for id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *             example:
 *               error: no data for id undef
 */
controller.get = async (req, res, next) => {
  const id = req.params.id;

  try {
    const data = await redis.hgetall(id);

    if (JSON.stringify(data) === '{}') newNotfound(`no data for id ${id}`);

    return res.json(data);
  } catch (err) {
    console.error(`redis error:\t${err}`);
    return next(err);
  }
};

/**
 * @swagger
 * /api/v1/data:
 *   get:
 *     description: Request all data
 *     tags: [Data]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: pretty
 *         description: Return a pretty json
 *         in: query
 *         required: false
 *         type: bool
 *     responses:
 *       200:
 *         description: datas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               keys: Data.id
 *               items:
 *                 $ref: '#/definitions/Data'
 *             example:
 *               test: { id: test, data: val1 }
 *
 */
controller.getAll = async (req, res, next) => {
  try {
    const ids = await redis.keys('*'),
          data = {};

    // TODO: pipe redis call
    for (const id of ids) data[id] = await redis.hgetall(id);

    return res.json(data);
  } catch (err) {
    console.error(`redis error:\t${err}`);
    return next(err);
  }
};

controller.create = async (req, res, next) => {};
controller.update = async (req, res, next) => {};

/**
 * @swagger
 * /api/v1/data/:id:
 *   delete:
 *     description: Remove id's data
 *     tags: [Data]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: pretty
 *         description: Return a pretty json
 *         in: query
 *         required: false
 *         type: bool
 *     responses:
 *       204:
 *         description: id's data
 *         content:
 *           application/json:
 *             example: {}
 *       404:
 *         description: no data found for id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Error'
 *             example:
 *               error: no data for id undef
 */
controller.delete = async (req, res, next) => {
  const id = req.params.id;

  try {
    const fields = await redis.hkeys(id);
    console.log(fields);
    if (fields.length === 0) newNotfound(`no data for id ${id}`);

    for (const field of fields) await redis.hdel(id, field);

    res.status(204);
    res.json(null);
  } catch (err) {
    console.error(`redis error:\t${err}`);
    return next(err);
  }
};

module.exports.data = controller;
