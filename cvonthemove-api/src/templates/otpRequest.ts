export const otpRequestTemplate = (name: string, otp: string) => ({
  subject: 'Your One-Time Passcode for CV on the Move',
  html: `
    <h1>Hi, ${name}!</h1>
    <p>Your one-time passcode is:</p>
    <h2>${otp}</h2>
    <p>Please use this code to complete your action. It will expire shortly.</p>
  `,
});
