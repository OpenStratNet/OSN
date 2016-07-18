Meteor.methods({
  'NewsEvents.insert': function (doc) {
     if (Meteor.userId()) {
      return NewsEvents.insert(doc);;
    }
  }
})
