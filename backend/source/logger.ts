import {createLogger, format, transports} from 'winston';
import expressWinston from 'express-winston';

const logLevels = {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5
};

const logger = createLogger({
    format: format.combine(format.timestamp(), format.json()),
    level: "info",
    levels: logLevels,
    transports: [new transports.Console()]
});

const expressLogger = expressWinston.logger({
    transports: [new transports.Console()],
    expressFormat: true
});

export default logger;
export {
    expressLogger
};
