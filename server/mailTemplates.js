Accounts.emailTemplates.siteName = 'Open Strategy Network';
Accounts.emailTemplates.from = 'Open Strategy Network <violetta.splitter@business.uzh.ch>';

// verification email
Accounts.emailTemplates.verifyEmail.subject = function (user) {
  return 'Confirm Your Email Address, ' + user.profile.firstName + ' ' + user.profile.lastName;
};
Accounts.emailTemplates.verifyEmail.text = function (user, url) {
  var urlWithoutHash = url.replace( '#/', '' );
  return 'Welcome to the Open Strategy Network!!\n' + 'To verify your email address go ahead and follow the link below:\n\n' + urlWithoutHash;
};
Accounts.emailTemplates.verifyEmail.html = function (user, url) {
  var urlWithoutHash = url.replace( '#/', '' );
  return '<h1>Welcome to the Open Strategy Network!</h1>' + '<p>To <strong>verify your email address</strong> go ahead and follow the <a href="'+urlWithoutHash+'">link</a></p>';
};

// password reset email
Accounts.emailTemplates.resetPassword.subject = function (user) {
  return 'Password reset for Open Strategy Network';
};
Accounts.emailTemplates.resetPassword.text = function (user, url) {
  return 'Reset your Password\n' + 'To reset your password go ahead and follow the link below:\n\n' + url;
};
Accounts.emailTemplates.resetPassword.html = function (user, url) {
  return '<h1>Reset your password for the Open Strategy Network!</h1>' + '<p>To <strong>reset your password</strong> go ahead and follow the <a href="'+url+'">link</a></p>';
};
