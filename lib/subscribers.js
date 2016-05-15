subscribers = new Mongo.Collection("subscribers");
subscribers.allow({
  insert: function() { return true; },
  update: function() { return true; },
  remove: function() { return true; }
});

// subscribers Methods
Meteor.methods({
  'subscribers.insert': function (doc) {
    if (this.userId) {
      subscribers.insert(doc);
    }
  },
  'subscribers.remove': function (id) {
    if (this.userId) {
      subscribers.remove(id);
    }
  },
  'subscribers.update': function (selector, modifier) {
    if (this.userId) {
      subscribers.update(selector, modifier);
    }
  }
});
