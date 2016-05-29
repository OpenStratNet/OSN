Subscribers = new Mongo.Collection("Subscribers");
Subscribers.allow({
  insert: function() { return true; },
  update: function() { return true; },
  remove: function() { return true; }
});
