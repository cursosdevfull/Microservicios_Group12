/**
 * @openapi
 * /user:
 *    post:
 *      tags:
 *        - User
 *      summary: Create a new user
 *      requestBody:
 *        description: User data
 *        required: true
 *        content:
 *           application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  name:
 *                    type: string
 *                    example: John
 *                    required: true
 *                  lastname:
 *                    type: string
 *                    example: Doe
 *                    required: true
 *                  email:
 *                    type: string
 *                    example: john.doe@company.com
 *                    required: true
 *                  password:
 *                    type: string
 *                    example: 123456
 *                    required: true
 *                  positionJobs:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                         area:
 *                           type: string
 *                           example: Development
 *                         position:
 *                           type: string
 *                           example: Developer
 *                         year:
 *                           type: number
 *                           example: 2021
 *                    required: true
 *      responses:
 *        200:
 *          description: User created
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: number
 *                    example: 200
 *                  data:
 *                    type: object
 *                    properties:
 *                      message:
 *                        type: string
 *                        example: User created
 *        411:
 *          description: Invalid parameters
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorParameters'
 */
