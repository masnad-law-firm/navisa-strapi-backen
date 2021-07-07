module.exports = ({ env }) => ({
  // ...
  email: {
    provider: "nodemailer",
    providerOptions: {
      host: "smtp-relay.sendinblue.com",
      port: 587,
      auth: {
        user: "info.kavesh@gmail.com",
        pass: "DO9Hg53kIxPbQzsj",
      },
    },
  },
  // ...
});
