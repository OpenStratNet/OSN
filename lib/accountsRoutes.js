// User Accounts
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('enrollAccount');
AccountsTemplates.configureRoute('forgotPwd', {
  name: 'forgotPW',
  path: '/forgot-password',
  template: 'forgotPW',
  layoutTemplate: 'ApplicationLayout',
});
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp', {
  redirect: '/profile-settings'
});
AccountsTemplates.configureRoute('verifyEmail', {
  onAfterAction: function () {
      Bert.alert("Email address validated. Thank you.");
    }
});