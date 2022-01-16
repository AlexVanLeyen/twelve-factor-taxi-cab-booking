import {checkSchema} from "express-validator";

export const bookingSchema = checkSchema({
    'source': {
        in: 'body',
        exists: {
            errorMessage: 'Field `source` cannot be empty',
            bail: true
        },
        isObject: {
            errorMessage: 'Field `source` must be an object',
            bail: true
        }
    },
    'source.x': {
        toInt: true,
        isInt: {
            errorMessage: 'Field `x` must be an integer',
            bail: true
        }
    },
    'source.y': {
        toInt: true,
        isInt: {
            errorMessage: 'Field `y` must be an integer',
            bail: true
        }
    },
    'destination': {
        in: 'body',
        exists: {
            errorMessage: 'Field `destination` cannot be empty',
            bail: true
        },
        isObject: {
            errorMessage: 'Field `destination` must be an object',
            bail: true
        }
    },
    'destination.x': {
        toInt: true,
        isInt: {
            errorMessage: 'Field `x` must be an integer',
            bail: true
        }
    },
    'destination.y': {
        toInt: true,
        isInt: {
            errorMessage: 'Field `y` must be an integer',
            bail: true
        }
    }
});
