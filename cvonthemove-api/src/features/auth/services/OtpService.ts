import prisma from '../../../lib/prisma';
import crypto from 'crypto';

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

    // In a real application, you would send this OTP via email or SMS
    // For now, we will just log it
    console.log(`Generated OTP for ${email}: ${otp}`);

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
