Meteor.startup(function () {
  smtp = {
    username: 'rahbaran.amir@gmail.com',
    password: '82Mihani82',
    server: 'smtp.gmail.com',
    port: 587
  };
  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});