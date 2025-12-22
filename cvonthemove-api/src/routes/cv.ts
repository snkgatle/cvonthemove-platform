import express from 'express';
import { CVController } from '../controllers/CVController';

const router = express.Router();

/* GET CV by ID. */
router.get('/:id', CVController.getCV);

export default router;
