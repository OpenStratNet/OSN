Meteor.subscribe('allSubscribers');
Template.navbar.onCreated(function () {
  showLogin = new ReactiveVar(false);
});

Template.navbar.helpers({
  showLoginDiv: function () {
    if (showLogin.get() === true) {
      return true;
    }
  }
});

Template.navbar.events({
  'click #loginButton': function (evt, temp) {
    evt.preventDefault();
    $('#loginModal').modal('show');
  },
  'click #at-facebook': function (evt, temp) {
    Meteor.loginWithFacebook();
    $('#loginModal').modal('hide');
    showLogin.set(false);
  },
  'click #at-google': function (evt, temp) {
    Meteor.loginWithGoogle();
    $('#loginModal').modal('hide');
    showLogin.set(false);
  },
  'click #at-linkedin': function (evt, temp) {
    Meteor.loginWithLinkedin();
    $('#loginModal').modal('hide');
    showLogin.set(false);
  },
  'click #at-twitter': function (evt, temp) {
    Meteor.loginWithTwitter();
    $('#loginModal').modal('hide');
    showLogin.set(false);
  },
  'submit form': function (event, temp) {
    event.preventDefault();

    var emailVar = $('#at-field-email').val(); //event.target.loginEmail.value;
    var passwordVar = $('#at-field-password').val(); //event.target.loginPassword.value;

    if (emailVar === "" || passwordVar === "") {
      Bert.alert('Please enter your email and password');
    }

    Meteor.loginWithPassword(emailVar, passwordVar, function (error) {
      if (error) {
        Bert.alert('Password and email do not match');
      }
    $('#loginModal').modal('hide');
    });

    // Delete later: idea was to show the login-div via CSS z-index
    // showLogin.set(false);
  },
  'click .js-logOut': function (evt, tpl) {
    AccountsTemplates.logout();
  },
  'click .js-logIn': function (evt, tpl) {
    // make a toggle event handler
    showLogin.set(!showLogin.get());
  }
});
