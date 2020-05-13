/**
 * @swagger
 * definitions:
 *   NewCredential:
 *     type: object
 *     required:
 *       - username
 *       - password
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 *         format: password
 *   Credential:
 *     allOf:
 *       - $ref: '#/definitions/NewCredential'
 *       - required:
 *         - id
 *       - properties:
 *         id:
 *           type: integer
 *           format: int64
  */

/**
 * @swagger
 *
 * /api/credential:
 *   get:
 *     description: Request TURN credentials
 *     produces:
 *       - application/json
 *     parameters:
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
 *         schema:
 *           type: object
 *           items:
 *             $ref: '#/definitions/Credential'
 *       400:
 *         cannot contact redis
 *       402:
 *         cannot generate credentail (TODO: define reasons)
 */
function getCredential(req, res, next) {
  // gen cred
  // save them in redis
  res.json({
    credential: 'smth',
    user: 'turlu',
  });
}

module.exports = { getCredential };
