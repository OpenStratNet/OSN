Meteor.methods({
  'NewsEvents.insert': function (doc) {
     if (Meteor.userId()) {
      return NewsEvents.insert(doc);
      console.log("n&E doc " + doc);
    }
  },
  'Publications.insert': function (doc) {
    if (this.userId) {
      //if (Roles.userIsInRole(this.userId, Meteor.settings.allow.Publications.insert)) {
      if (Meteor.userId()) {
        return Publications.insert(doc);
        console.log("doc " + doc);
      } else {
        console.log('Publications.insert: access denied.');
      }
    }
  }
})
