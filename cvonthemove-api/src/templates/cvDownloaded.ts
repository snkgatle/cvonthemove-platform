export const cvDownloadedTemplate = (name: string) => ({
  subject: 'Your CV Has Been Downloaded',
  html: `
    <h1>Hi, ${name}!</h1>
    <p>Your CV has been successfully downloaded from CV on the Move.</p>
    <p>If you did not initiate this download, please review your account activity.</p>
  `,
});
