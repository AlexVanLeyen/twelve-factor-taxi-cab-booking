import express from 'express';
import api from '#controllers/api';
import {bookingSchema} from '#schemas/booking';

const router = express.Router();

router.post('/book', bookingSchema, api.book);
router.put('/reset', api.reset);
router.post('/tick', api.tick);

export default router;
