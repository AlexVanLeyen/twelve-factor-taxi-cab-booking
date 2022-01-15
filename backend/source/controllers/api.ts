import {Request, Response} from 'express';

const book = (req: Request, res: Response) => {
    return res.status(501).send();
};

const reset = (req: Request, res: Response) => {
    return res.status(501).send();
};

const tick = (req: Request, res: Response) => {
    return res.status(501).send();
};

export default {book, reset, tick};
