import express, { Request, Response, NextFunction } from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', function (req: Request, res: Response, next: NextFunction) {
    res.json({ title: 'Express', message: 'Welcome to CV On The Move API' });
});

export default router;
