import express from 'express';
import apiRoutes from '#routes/api';
import errorRoutes from '#routes/_404';
import logger, {expressLogger} from '#logger';

const PORT = process.env.PORT ?? 8080;

const app = express();

app.use(expressLogger);
app.use(express.json());

app.use('/api', apiRoutes);
app.use(errorRoutes);

app.listen(PORT, () => {
    logger.info(`Server is running at https://localhost:${PORT}`);
});
