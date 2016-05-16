Template.body.onCreated(function () {
  Meteor.subscribe('publications');
  Meteor.subscribe('newsevents');
  Meteor.subscribe('tags');
  Meteor.subscribe('categories');
  Meteor.subscribe('images');
  Meteor.subscribe('attachments');
  Meteor.subscribe('profilePic');
  Meteor.subscribe('users');
});
