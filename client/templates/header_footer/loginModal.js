Template.loginModalTemplate.events({
  'click #modalAnchor': function (evt, temp) {
    evt.preventDefault();
    Router.go('/joinus');
    $('#loginModal').modal('hide');
  },
  'click .forgot': function(evt) {
	evt.preventDefault();
    Router.go('/password-forgot');
	$('#loginModal').modal('hide');
  }
})
