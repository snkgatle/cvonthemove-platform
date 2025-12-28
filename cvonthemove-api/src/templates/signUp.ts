export const signUpTemplate = (name: string) => ({
  subject: 'Welcome to CV on the Move!',
  html: `
    <h1>Welcome, ${name}!</h1>
    <p>Thank you for signing up for CV on the Move. We're excited to have you on board.</p>
  `,
});
