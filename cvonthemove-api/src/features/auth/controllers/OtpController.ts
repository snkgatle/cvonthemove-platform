import { Request, Response } from 'express';
import { OtpService } from '../services/OtpService';

export class OtpController {
  static async requestOtp(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const otp = await OtpService.generateOtp(email);
      // In production, do NOT return the OTP in the response.
      // We are logging it in the service for testing purposes.
      res.status(200).json({ message: 'OTP generated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to generate OTP' });
    }
  }

  static async verifyOtp(req: Request, res: Response) {
    try {
      const { email, otp } = req.body;
      const isValid = await OtpService.verifyOtp(email, otp);

      if (isValid) {
        res.status(200).json({ message: 'OTP verified successfully' });
      } else {
        res.status(400).json({ error: 'Invalid or expired OTP' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to verify OTP' });
    }
  }
}
