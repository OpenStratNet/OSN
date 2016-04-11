Template.navbar.onCreated(function(){
  showLogin = new ReactiveVar(false);
})

Template.navbar.helpers({
  showLoginDiv: function () {
    if (showLogin.get() === true) {
      return true;
    }
  }
});

Template.navbar.events({
  'click .js-logOut': function (evt, tpl) {
    AccountsTemplates.logout();
  },
  'click .js-logIn': function (evt, tpl) {
    // make a toggle event handler
    showLogin.set(!showLogin.get());
  }
});

