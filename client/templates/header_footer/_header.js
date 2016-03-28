Template.navbar.onCreated(function(){
  showLogin = new ReactiveVar(false);
})

Template.navbar.events({
  'click .js-logOut': function (evt, tpl) {
    AccountsTemplates.logout();
  },
  'click .js-logIn': function (evt, tpl) {
    // make a toggle event handler
    showLogin.set(!showLogin.get());
  }
});

Template.navbar.helpers({
  showLoginDiv: function () {
    if (showLogin.get() === true) {
      return true;
    }
  }
});

Template.logInWindow.events({
  'click #at-facebook': function (evt, temp) {
    Meteor.loginWithFacebook();
    showLogin.set(false); 
  },
  'click #at-google': function (evt, temp) {
    Meteor.loginWithGoogle();
    showLogin.set(false); 
  },
  'click #at-linkedin': function (evt, temp) {
    Meteor.loginWithLinkedin();
    showLogin.set(false); 
  },
  'click #at-twitter': function (evt, temp) {
    Meteor.loginWithTwitter();
    showLogin.set(false); 
  },
  'submit form': function(evt, temp){
    event.preventDefault();
    
    var emailVar = $('#at-field-email').val();//event.target.loginEmail.value;
    var passwordVar = $('#at-field-password').val();//event.target.loginPassword.value;

    if (emailVar === "" || passwordVar === "") {
       Bert.alert('Please enter your email and password');
    } else {
      Meteor.loginWithPassword(emailVar, passwordVar, function(error) {
        Bert.alert('Password and email do not match');
      });
    }     
    showLogin.set(false); 
  }
});