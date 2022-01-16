import {Request, Response} from 'express';
import {world, resetWorld} from '#world';
import {validationResult} from 'express-validator';
import {BookingResponse} from '#models/World';
import Booking from '#models/Booking';
import Vertex from '#models/Vertex';
import OutsideGridException from '#exceptions/OutsideGridException';
import logger from '#logger';

const book = (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {source, destination} = req.body;

    const booking = new Booking({
        source: new Vertex(source),
        destination: new Vertex(destination)
    });


    let response: BookingResponse;
    try {
        response = world.book(booking);
    } catch (error) {
        if (error instanceof OutsideGridException) {
            return res.status(422).json({message: 'Booking source or destination is out of bounds.'});
        }

        logger.error(error);

        return res.status(500).send();
    }

    if (response === false) {
        return res.status(202).send();
    }

    return res.status(200).json({
        car_id: response.carId,
        total_time: response.totalTime
    });
};

const reset = (req: Request, res: Response) => {
    resetWorld();

    return res.status(200).send();
};

const tick = (req: Request, res: Response) => {
    world.tick();

    return res.status(200).send();
};

export default {book, reset, tick};
