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
