import express from 'express';
import api from '#controllers/api';

const router = express.Router();

router.post('/book', api.book);
router.post('/reset', api.reset);
router.put('/tick', api.tick);

export default router;
