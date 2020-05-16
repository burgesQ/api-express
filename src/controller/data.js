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
 *       - name: page
 *         description: Return the n'th page
 *         in: query
 *         required: false
 *         type: int
 *       - name: limit
 *         description: Size of a page
 *         in: query
 *         required: false
 *         type: int
 *     responses:
 *       200:
 *         description: datas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Data'
 *             example:
 *               datas:
 *                 - { id: 1, data: val1 }
 *                 - { id: 2, data: val2 }
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
controller.delete = async (req, res, next) => {};

module.exports.data = controller;
