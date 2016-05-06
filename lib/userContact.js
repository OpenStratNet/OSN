userContact = new Mongo.Collection("userContact");
userContact.allow({
  insert: function() { return true; },
  update: function() { return true; },
  remove: function() { return true; }
});