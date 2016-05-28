Subscribers = new Mongo.Collection("subscribers");
Subscribers.allow({
  insert: function() { return true; },
  update: function() { return true; },
  remove: function() { return true; }
});
