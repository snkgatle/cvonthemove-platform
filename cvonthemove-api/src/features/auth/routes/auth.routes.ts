import express from 'express';
import { validate } from '../../../middleware/validateResource';
import { LoginSchema, RegisterSchema } from '../schemas/authSchemas';
import { RequestOtpSchema, VerifyOtpSchema } from '../schemas/otpSchemas';
import { AuthController } from '../controllers/AuthController';
import { OtpController } from '../controllers/OtpController';

const router = express.Router();

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered
 *       409:
 *         description: User already exists
 */
router.post('/register', validate(RegisterSchema), AuthController.register);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', validate(LoginSchema), AuthController.login);

/**
 * @openapi
 * /auth/otp/request:
 *   post:
 *     summary: Request an OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP generated successfully
 *       500:
 *         description: Failed to generate OTP
 */
router.post('/otp/request', validate(RequestOtpSchema), OtpController.requestOtp);

/**
 * @openapi
 * /auth/otp/verify:
 *   post:
 *     summary: Verify an OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, otp]
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *       400:
 *         description: Invalid or expired OTP
 *       500:
 *         description: Failed to verify OTP
 */
router.post('/otp/verify', validate(VerifyOtpSchema), OtpController.verifyOtp);

/**
 * @openapi
 * /auth/forgot-password:
 *   post:
 *     summary: Request a password reset
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset link sent
 */
router.post('/forgot-password', AuthController.forgotPassword);

/**
 * @openapi
 * /auth/reset-password:
 *   post:
 *     summary: Reset the password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [token, newPassword]
 *             properties:
 *               token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Invalid or expired token
 */
router.post('/reset-password', AuthController.resetPassword);

export default router;
