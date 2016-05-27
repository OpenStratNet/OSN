Template.loginModalTemplate.events({
  'click #modalAnchor': function (evt, temp) {
    evt.preventDefault();
    Router.go('/joinus');
    $('#loginModal').modal('hide');
  }
})
