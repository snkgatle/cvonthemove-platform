export const passwordResetTemplate = (name: string, resetLink: string) => ({
  subject: 'Password Reset Request for CV on the Move',
  html: `
    <h1>Hi, ${name}!</h1>
    <p>You have requested to reset your password. Please click the link below to proceed:</p>
    <a href="${resetLink}">Reset Password</a>
    <p>If you did not request this, please ignore this email.</p>
  `,
});
