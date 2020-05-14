// credential.js hold the credential endpoint

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
  res.json({
    credential: 'smth',
    user: 'turlu',
  });
}


module.exports = getCredential;
