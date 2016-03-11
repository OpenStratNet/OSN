seeMore = new ReactiveVar("no");

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
  noPicture: function () {
    // return NewsEvents.findOne({_id:this._id},{coverImageId: { $exists: true } });
    var currUser = Meteor.users.findOne( {_id:this._id} );
    if (!currUser.profile.picture && !currUser.profile.pictureID)  {
      return true;
    } else {
      return false;
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
  },
  noPics: function() {
    if (Meteor.user().profile.pictureID === false && Meteor.user().profile.picture === false) {
      return true;
    }
  },
});