Meteor.publish('publications', function () {
  return Publications.find();
});

Meteor.publish('newsevents', function () {
  return NewsEvents.find();
});
