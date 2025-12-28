import prisma from '../../../lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { LoginInput, RegisterInput } from '../schemas/authSchemas';
import { sendEmail } from '../../../lib/email';
import { signUpTemplate } from '../../../templates/signUp';
import { loginTemplate } from '../../../templates/login';
import { passwordResetTemplate } from '../../../templates/passwordReset';
import config from '../../../config';
import crypto from 'crypto';

const JWT_SECRET = config.jwtSecret;

export class AuthService {
    static async register(data: RegisterInput) {
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email },
        });

        if (existingUser) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
            },
        });

        await sendEmail({
            to: user.email,
            ...signUpTemplate(user.email.split('@')[0]),
        });

        // Omit password from return
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    static async login(data: LoginInput) {
        const user = await prisma.user.findUnique({
            where: { email: data.email },
        });

        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(data.password, user.password);

        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
            expiresIn: '24h',
        });

        await sendEmail({
            to: user.email,
            ...loginTemplate(user.email.split('@')[0]),
        });

        const { password, ...userWithoutPassword } = user;

        return { user: userWithoutPassword, token };
    }

    static async forgotPassword(email: string) {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            // Don't reveal if user exists
            return;
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const passwordResetToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');

        const passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        await prisma.user.update({
            where: { email },
            data: {
                passwordResetToken,
                passwordResetExpires,
            },
        });

        const resetUrl = `${config.frontendUrl}/reset-password?token=${resetToken}`;

        await sendEmail({
            to: user.email,
            ...passwordResetTemplate(user.email.split('@')[0], resetUrl),
        });
    }

    static async resetPassword(token: string, newPassword: string) {
        const hashedToken = crypto
            .createHash('sha256')
            .update(token)
            .digest('hex');

        const user = await prisma.user.findFirst({
            where: {
                passwordResetToken: hashedToken,
                passwordResetExpires: { gt: new Date() },
            },
        });

        if (!user) {
            throw new Error('Token is invalid or has expired');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                passwordResetToken: null,
                passwordResetExpires: null,
            },
        });
    }
}
