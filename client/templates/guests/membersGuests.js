Template.membersGuests.events({
  'submit form': function(event){
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
  }
});