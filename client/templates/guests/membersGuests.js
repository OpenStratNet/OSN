// Template.membersGuests.inheritsHelpersFrom("atPwdFormMod");
// Template.membersGuests.inheritsEventsFrom("atPwdFormMod");

Template.membersGuests.events({
    'submit form': function(event){
        event.preventDefault();
        var emailVar = $('#at-field-email').val();//event.target.loginEmail.value;
        var passwordVar = $('#at-field-password').val();//event.target.loginPassword.value;
        Meteor.loginWithPassword(emailVar, passwordVar);
    }
});