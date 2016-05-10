Meteor.publish('publications', function () {
  return Publications.find();
});

Meteor.publish('newsevents', function () {
  return NewsEvents.find();
});

Meteor.publish('tags', function () {
  return Tags.find();
});

Meteor.publish('categories', function () {
  return Categories.find();
});

Meteor.publish('images', function () {
  return Images.find();
});

Meteor.publish('attachments', function () {
  return Attachments.find();
});
