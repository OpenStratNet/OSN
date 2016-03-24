Template.adminMembersList.helpers({
  members: function () {
    return Meteor.users.find({}, {sort: {"profile.lastName": 1}});
  }
});