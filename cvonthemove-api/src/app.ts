import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import cvBuilderRoutes from './features/cv-builder/routes/CVBuilderRoutes';
import authRoutes from './features/auth/routes/auth.routes';
import fs from 'fs';

const app = express();

const packageJsonPath = path.join(__dirname, '../package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
const version = packageJson.version;

app.use(cors()); // Allow all origins for now (or configure specific origins)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Removed express.static and view engine setup for Pure REST API

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/auth', authRoutes);
app.get('/version', (req, res) => {
    res.json({ version });
});
app.use('/', cvBuilderRoutes); // Mounted at root as per request requirements

export default app;
