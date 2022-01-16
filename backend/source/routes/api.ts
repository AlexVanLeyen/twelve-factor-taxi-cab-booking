import express from 'express';
import api from '#controllers/api';
import {bookingSchema} from '#schemas/booking';

const router = express.Router();

router.post('/book', bookingSchema, api.book);
router.post('/reset', api.reset);
router.put('/tick', api.tick);

export default router;
