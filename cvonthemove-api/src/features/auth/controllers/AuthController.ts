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

    static async forgotPassword(req: Request, res: Response) {
        try {
            await AuthService.forgotPassword(req.body.email);
            res.status(200).json({ message: 'If a user with that email exists, a password reset link has been sent.' });
        } catch (error: any) {
            res.status(500).json({ error: 'An error occurred' });
        }
    }

    static async resetPassword(req: Request, res: Response) {
        try {
            const { token, newPassword } = req.body;
            await AuthService.resetPassword(token, newPassword);
            res.status(200).json({ message: 'Password has been reset successfully.' });
        } catch (error: any) {
            if (error.message === 'Token is invalid or has expired') {
                return res.status(400).json({ error: error.message });
            }
            res.status(500).json({ error: 'An error occurred' });
        }
    }

    static async changePassword(req: Request, res: Response) {
        try {
            const userId = (req as any).user.userId;
            await AuthService.changePassword(userId, req.body);
            res.status(200).json({ message: 'Password changed successfully' });
        } catch (error: any) {
            if (error.message === 'Invalid old password') {
                return res.status(400).json({ error: error.message });
            }
            res.status(500).json({ error: 'Failed to change password' });
        }
    }
}
