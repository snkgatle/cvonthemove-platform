import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

export class AuthController {
    static async register(req: Request, res: Response) {
        try {
            const result = await AuthService.register(req.body);
            res.status(201).json(result);
        } catch (error: any) {
            if (error.message === 'User already exists') {
                return res.status(409).json({ error: error.message });
            }
            console.log(error);
            res.status(500).json({ error: 'Registration failed' });
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const result = await AuthService.login(req.body);
            res.status(200).json(result);
        } catch (error: any) {
            if (error.message === 'Invalid credentials') {
                return res.status(401).json({ error: error.message });
            }
            res.status(500).json({ error: 'Login failed' });
        }
    }
}
