// credential.js hold the credential endpoint

const schema = require('./data.form');
const client = require('../client/redis');

//const controller = {};
//let redis = {};

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
 *         - some_string
 *         - some_int
 *       properties:
 *         id:
 *           type: string
 *           description: ID linked to the data
 *         some_string:
 *           type: string
 *           description: ID string data
 *         some_int:
 *           type: int64
 *           description: ID int data
 *       example:
 *         id: test
 *         some_string: some content
 *         some_int: 1
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

function newHTTPError(status, msg) {
  const err = new Error(msg);
  err.status = status;
  throw err;
}

// generate a not found error (404)
function newNotfound(msg) {
  newHTTPError(404, msg);
}

// generate a not found error (404)
function newForbidden(msg) {
  newHTTPError(403, msg);
}

class Controller {

  constructor(redis) {
    this.redis = redis;

    this.get = this.get.bind(this);
    this.getAll = this.getAll.bind(this);
    this.delete = this.delete.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
  }



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
   *               id: test
   *               some_string: some content
   *               some_int: 1
   *       404:
   *         description: no data found for id
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/definitions/Error'
   *             example:
   *               error: no data for id undef
   */
  async get(req, res, next) {
    const {id} = req.params;

    try {
      const data = await client.getOneData(this.redis, id);
      if (JSON.stringify(data) === '{}') newNotfound(`no data for id ${id}`);
      res.json(data);
    } catch (err) {
      next(err);
    }
  }

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
   *               items:
   *                 $ref: '#/definitions/Data'
   *             example:
   *               - { id: test, some_string: "some content", some_int: 1 }
   *               - { id: test2, some_string: "another content", some_int: -42 }
   *
   */
  async getAll(req, res, next) {
    try {
      res.json(await client.getAllData(this.redis));
    } catch (err) {
      next(err);
    }
  }

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
   *       - name: fields
   *         description: Coma sepatared list of filed to remove (leave empty to clear the obj)
   *         in: query
   *         required: false
   *         type: string
   *     responses:
   *       204:
   *         description: id's data
   *         content:
   *           application/json:
   *             example: {}
   */
  async delete(req, res, next) {
    const {id} = req.params;
    let toRemove = req.query.fields;

    toRemove =  (toRemove !== undefined) ?
      toRemove.split(',') :  [];

    try {
      client.remove(this.redis, id, toRemove);
      res.status(204);
      res.json(null);
    } catch (err) {
      next(err);
    }
  }

  /**
   * @swagger
   * /api/v1/data:
   *   post:
   *     description: Create a data
   *     tags: [Data]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: pretty
   *         description: Return a pretty json
   *         in: query
   *         required: false
   *         type: bool
   *       - name: pass
   *         description: New pass object
   *         in: body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/ChangePass'


   *     responses:
   *       204:
   *         description: data created
   *         content:
   *           application/json:
   *             example: {}
   *       403:
   *         description: id already assigned
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/definitions/Error'
   *             example:
   *               error: id is already assigned
   *       400:
   *         description: validation error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/definitions/Error'
   *             example:
   *               error: id is required
   */
  async create(req, res, next) {
   try {

     // console.log(req.body);
     const form = await schema.validateAsync(req.body),
           id = form.id;

     const data = await client.getOneData(this.redis, id);

     if (JSON.stringify(data) !== '{}') newForbidden(`id ${id} already assigned`);
     for (const key in form) client.setFields(this.redis, id, key, form[key]);

     res.status(204).json({});
    } catch (err) {
      err.status = 400;
      next(err);
    }
  };

  update(req, res, next) {}
};

module.exports = Controller;
