/**
 * @swagger
 *
 * /api/credential:
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
 *         schema:
 *           $ref: '#/definitions/Credential'
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
