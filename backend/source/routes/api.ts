import express from 'express';
import api from '#controllers/api';
import {bookingSchema} from '#schemas/booking';

const router = express.Router();

/**
 * @openapi
 * tags:
 *  name: api
 *  description: The taxi booking api
 */

/**
 * @openapi
 * /api/book:
 *  post:
 *      description: Attempt to book a taxi within the booking system.
 *      tags: [api]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          source:
 *                              type: object
 *                              properties:
 *                                  x:
 *                                      type: integer
 *                                      example: 100
 *                                  y:
 *                                      type: integer
 *                                      example: -200
 *                              destination:
 *                                  type: object
 *                                  properties:
 *                                      x:
 *                                          type: integer
 *                                          example: -2500
 *                                      y:
 *                                          type: integer
 *                                          example: 50
 *      responses:
 *          200:
 *              description: Booking was successful.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              car_id:
 *                                  type: integer
 *                              total_time:
 *                                  type: integer
 *          202:
 *              description: Booking was accepted, however no taxis are available.
 *          400:
 *              description: Request was malformed.
 *          422:
 *              description: Request was well formed, however the system rejected it.
 *          500:
 *              description: (temporary) server error. Try again, or contact support.
 */
router.post('/book', bookingSchema, api.book);

/**
 * @openapi
 * /api/reset:
 *  put:
 *      description: Will reset the taxi booking system.
 *      tags: [api]
 *      responses:
 *          200:
 *              description: Reset was successful
 */
router.put('/reset', api.reset);

/**
 * @openapi
 * /api/tick:
 *  post:
 *      description: Will advance the simulated taxis by one tick.
 *      tags: [api]
 *      responses:
 *          200:
 *              description: Request was successful
 */
router.post('/tick', api.tick);

export default router;
