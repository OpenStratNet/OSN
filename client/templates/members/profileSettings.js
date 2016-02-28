Template.profileSettings.onRendered(function() {
	$('[data-toggle="tooltip"]').tooltip();
});

Template.profileSettings.helpers({
	userData: function () {
		return Meteor.user();
	}
});