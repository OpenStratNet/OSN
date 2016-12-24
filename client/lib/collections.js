// Publications Methods
Meteor.methods({
  // 'Publications.insert': function (doc) {
  //   if (this.userId) {
  //     Publications.insert(doc);
  //   }
  // },
  'Publications.remove': function (id) {
    if (this.userId) {
      Publications.remove(id);
    }
  },
  'Publications.update': function (selector, modifier) {
    if (this.userId) {
      Publications.update(selector, modifier);
    }
  }
});

// NewsEvents Methods
Meteor.methods({
  /* return "doc" won't reach callback in admin-news-events.js
  moved to lib folder

  'NewsEvents.insert': function (doc) {
      if (this.userId) {
      return NewsEvents.insert(doc);
    }
  },
  */
  'NewsEvents.remove': function (id) {
    if (this.userId) {
      NewsEvents.remove(id);
    }
  },
  'NewsEvents.update': function (selector, modifier) {
    if (this.userId) {
      NewsEvents.update(selector, modifier);
    }
  }
});

// Tags Methods
Meteor.methods({
  'Tags.insert': function (doc) {
    if (this.userId) {
      Tags.insert(doc);
    }
  },
  'Tags.remove': function (id) {
    if (this.userId) {
      Tags.remove(id);
    }
  },
  'Tags.update': function (selector, modifier) {
    if (this.userId) {
      Tags.update(selector, modifier);
    }
  }
});

// Categories Methods
Meteor.methods({
  'Categories.insert': function (doc) {
    if (this.userId) {
      Categories.insert(doc);
    }
  },
  'Categories.remove': function (id) {
    if (this.userId) {
      Categories.remove(id);
    }
  },
  'Categories.update': function (selector, modifier) {
    if (this.userId) {
      Categories.update(selector, modifier);
    }
  }
});

// Images Methods
Meteor.methods({
  'Images.remove': function (id) {
    if (this.userId) {
      Images.remove(id);
    }
  },
  'Images.update': function (selector, modifier) {
    if (this.userId) {
      Images.update(selector, modifier);
    }
  }
});

// ProfilePic Methods
Meteor.methods({
  'ProfilePic.remove': function (id) {
    if (this.userId) {
      ProfilePic.remove(id);
    }
  },
  'ProfilePic.update': function (selector, modifier) {
    if (this.userId) {
      ProfilePic.update(selector, modifier);
    }
  }
});

// Attachments Methods
Meteor.methods({
  'Attachments.remove': function (id) {
    if (this.userId) {
      Attachments.remove(id);
    }
  },
  'Attachments.update': function (selector, modifier) {
    if (this.userId) {
      Attachments.update(selector, modifier);
    }
  }
});
