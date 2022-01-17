import express from 'express';
import apiRoutes from '#routes/api';
import errorRoutes from '#routes/_404';
import logger, {expressLogger} from '#logger';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import * as swaggerDefinition from 'swagger.json';

const PORT = process.env.PORT ?? 8080;
const specs = swaggerJsdoc({
    swaggerDefinition,
    apis: [`**/routes/*.ts`]
});

const app = express();

app.use(expressLogger);
app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api', apiRoutes);
app.use(errorRoutes);

app.listen(PORT, () => {
    logger.info(`Server is running at http://localhost:${PORT}`);
});
