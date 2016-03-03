Template.profileSettings.onRendered(function() {
	// if scrolling is necessary $("html, body").animate({ scrollTop: 0 });
  window.scrollTo(0, 0);
  $('[data-toggle="tooltip"]').tooltip();
});

Template.profileSettings.helpers({
	userData: function () {
		return Meteor.user();
	}
});