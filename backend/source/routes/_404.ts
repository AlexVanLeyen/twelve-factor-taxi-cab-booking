import express, {Request, Response} from 'express';

const router = express.Router();

router.use((req: Request, res: Response) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});

export default router;
