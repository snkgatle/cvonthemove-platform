import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import cvBuilderRoutes from './features/cv-builder/routes/cvBuilder.routes';
import authRoutes from './features/auth/routes/auth.routes';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Removed express.static and view engine setup for Pure REST API

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/auth', authRoutes);
app.use('/', cvBuilderRoutes); // Mounted at root as per request requirements

export default app;
