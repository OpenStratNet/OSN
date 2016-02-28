Template.navbar.events({
  'click .js-logOut': function (evt, tpl) {
    evt.preventDefault();
    AccountsTemplates.logout();
  }
});