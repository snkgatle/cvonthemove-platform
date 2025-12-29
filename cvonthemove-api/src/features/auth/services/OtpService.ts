import prisma from '../../../lib/prisma';
import crypto from 'crypto';
import { sendEmail } from '../../../lib/email';
import { otpRequestTemplate } from '../../../templates/otpRequest';

export class OtpService {
  static async generateOtp(email: string) {
    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    // Store OTP in database
    await prisma.oneTimePassword.create({
      data: {
        email,
        otp,
        expiresAt,
      },
    });

    await sendEmail({
      to: email,
      ...otpRequestTemplate(email.split('@')[0], otp),
    });

    return otp;
  }

  static async verifyOtp(email: string, otp: string) {
    const record = await prisma.oneTimePassword.findFirst({
      where: {
        email,
        otp,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!record) {
      return false;
    }

    // OTP is valid, delete it (or mark as used)
    await prisma.oneTimePassword.delete({
      where: {
        id: record.id,
      },
    });

    return true;
  }
}
