// set see more to yes, change later to no (when more is uplaoded)
seeMore = new ReactiveVar("yes");

Template.membersMembers.events({
  'click .js-seeMoreMem': function (evt, tmo) {
    evt.preventDefault();
    seeMore.set("yes");
  }
});

Template.membersMembers.helpers({
  atts: function() {
    return {'class': 'form-control', 'placeholder': "Search for a member or institution"};
  },
  membersIndex: function() {
    return MembersIndex;
  },
  membersData: function () {
    if (seeMore.get() === "no") {
      return Meteor.users.find({},{limit: 3}).fetch();
    } else {
      return Meteor.users.find().fetch();
    }
  },
  profilePic: function() {
    if (Meteor.user().profile.picture) {
      return true;
    }
  },
  pictureID: function() {
    if (Meteor.user().profile.pictureID) {
      return true;
    }
  }
});
