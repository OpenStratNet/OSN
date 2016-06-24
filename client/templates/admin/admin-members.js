Template.adminMembersList.helpers({
  members: function () {
    return Meteor.users.find({}, {sort: {"profile.lastName": 1}});
  },
  url: function() {
	  return Meteor.absoluteUrl();
  }
});