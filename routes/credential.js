// credential.js hold the credential endpoint

const redis = require('../redis-client');

/**
 * @swagger
 * tags:
 *   name: Credentials
 *   description: Credentials management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Credential:
 *       type: object
 *       required:
 *         - id
 *         - value
 *       properties:
 *         id:
 *           type: string
 *           description: ID linked to the TURN the credential
 *         value:
 *           type: string
 *           description: TURN credential
 *       example:
 *         id: 1234
 *         value: tutu
 */

/**
 * @swagger
 * definitions:
 *   Credential:
 *     schema:
 *       $ref: '#/components/schemas/Credential'
 */

/**
 * @swagger
 * /api/v1/credential:
 *   get:
 *     description: Request TURN credentials
 *     tags: [Credentials]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: pretty
 *         description: Return a pretty json
 *         in: query
 *         required: false
 *         type: bool
 *       - name: token
 *         description: Base64 encoded hash token
 *         in: query
 *         required: true
 *         type: string
 *       - name: confname
 *         description: Conference name
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: TURN credential generated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Credential'
 *             example:
 *               id: new_user
 *               value: new_credential
 */
function getCredential(req, res, next) {
    // gen cred
    // save them in redis
    // fetch data from url query

  redis.client().get('key', (err, result) => {
    if (err) {
      console.error(`redis error:\t${err}`);
      return next(err);
    } else {
      console.log("ret val is " + result);
      redis.client().set('key', `${result}+`);
      res.json({
        credential: result,
        user: 'turlu',
      });
    }
  });
}

module.exports = {
  get: getCredential
}
