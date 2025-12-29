export const loginTemplate = (name: string) => ({
  subject: 'Successful Login to CV on the Move',
  html: `
    <h1>Hi, ${name}!</h1>
    <p>We're just letting you know that there has been a successful login to your CV on the Move account.</p>
    <p>If this was not you, please secure your account immediately.</p>
  `,
});
