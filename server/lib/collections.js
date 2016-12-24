// Publications Methods
Meteor.methods({
  // 'Publications.insert': function (doc) {
  //   if (this.userId) {
  //     if (Roles.userIsInRole(this.userId, Meteor.settings.allow.Publications.insert)) {
  //       Publications.insert(doc);
  //     } else {
  //       console.log('Publications.insert: access denied.');
  //     }
  //   }
  // },
  'Publications.remove': function (id) {
    if (this.userId) {
      if (Roles.userIsInRole(this.userId, Meteor.settings.allow.Publications.remove)) {
        Publications.remove(id);
      } else {
        console.log('Publications.remove: access denied.');
      }
    }
  },
  'Publications.update': function (selector, modifier) {
    if (this.userId) {
      if (Roles.userIsInRole(this.userId, Meteor.settings.allow.Publications.update)) {
        Publications.update(selector, modifier);
      } else {
        console.log('Publications.update: access denied.');
      }
    }
  }
});

// NewsEvents Methods
Meteor.methods({
  /* callback function in client won't work if method is defined on the server

  'NewsEvents.insert': function (doc) {
    if (this.userId) {
      if (Roles.userIsInRole(this.userId, Meteor.settings.allow.NewsEvents.insert)) {
        NewsEvents.insert(doc);
      } else {
        console.log('NewsEvents.insert: access denied.');
      }
    }
  },
  */
  'NewsEvents.remove': function (id) {
    if (this.userId) {
      if (Roles.userIsInRole(this.userId, Meteor.settings.allow.NewsEvents.remove)) {
        NewsEvents.remove(id);
      } else {
        console.log('NewsEvents.remove: access denied.');
      }
    }
  },
  'NewsEvents.update': function (selector, modifier) {
    if (this.userId) {
      if (Roles.userIsInRole(this.userId, Meteor.settings.allow.NewsEvents.update)) {
        NewsEvents.update(selector, modifier);
      } else {
        console.log('NewsEvents.update: access denied.');
      }
    }
  }
});

// Tags Methods
Meteor.methods({
  'Tags.insert': function (doc) {
    if (this.userId) {
      if (Roles.userIsInRole(this.userId, Meteor.settings.allow.Tags.insert)) {
        Tags.insert(doc);
      } else {
        console.log('Tags.insert: access denied.');
      }
    }
  },
  'Tags.remove': function (id) {
    if (this.userId) {
      if (Roles.userIsInRole(this.userId, Meteor.settings.allow.Tags.remove)) {
        Tags.remove(id);
      } else {
        console.log('Tags.remove: access denied.');
      }
    }
  },
  'Tags.update': function (selector, modifier) {
    if (this.userId) {
      if (Roles.userIsInRole(this.userId, Meteor.settings.allow.Tags.update)) {
        Tags.update(selector, modifier);
      } else {
        console.log('Tags.update: access denied.');
      }
    }
  }
});

// Categories Methods
Meteor.methods({
  'Categories.insert': function (doc) {
    if (this.userId) {
      if (Roles.userIsInRole(this.userId, Meteor.settings.allow.Categories.insert)) {
        Categories.insert(doc);
      } else {
        console.log('Categories.insert: access denied.');
      }
    }
  },
  'Categories.remove': function (id) {
    if (this.userId) {
      if (Roles.userIsInRole(this.userId, Meteor.settings.allow.Categories.remove)) {
        Categories.remove(id);
      } else {
        console.log('Categories.remove: access denied.');
      }
    }
  },
  'Categories.update': function (selector, modifier) {
    if (this.userId) {
      if (Roles.userIsInRole(this.userId, Meteor.settings.allow.Categories.update)) {
        Categories.update(selector, modifier);
      } else {
        console.log('Categories.update: access denied.');
      }
    }
  }
});

// Images Methods
Meteor.methods({
  'Images.remove': function (id) {
    if (this.userId) {
      if (Roles.userIsInRole(this.userId, Meteor.settings.allow.Images.remove)) {
        Images.remove(id);
      } else {
        console.log('Images.remove: access denied.');
      }
    }
  },
  'Images.update': function (selector, modifier) {
    if (this.userId) {
      if (Roles.userIsInRole(this.userId, Meteor.settings.allow.Images.update)) {
        Images.update(selector, modifier);
      } else {
        console.log('Images.update: access denied.');
      }
    }
  }
});

// ProfilePic Methods
Meteor.methods({
  'ProfilePic.remove': function (id) {
    if (this.userId) {
      if (Roles.userIsInRole(this.userId, Meteor.settings.allow.ProfilePic.remove)) {
        ProfilePic.remove(id);
      } else {
        console.log('ProfilePic.remove: access denied.');
      }
    }
  },
  'ProfilePic.update': function (selector, modifier) {
    if (this.userId) {
      if (Roles.userIsInRole(this.userId, Meteor.settings.allow.ProfilePic.update)) {
        ProfilePic.update(selector, modifier);
      } else {
        console.log('ProfilePic.update: access denied.');
      }
    }
  }
});

// Attachments Methods
Meteor.methods({
  'Attachments.remove': function (id) {
    if (this.userId) {
      if (Roles.userIsInRole(this.userId, Meteor.settings.allow.Attachments.remove)) {
        Attachments.remove(id);
      } else {
        console.log('Attachments.remove: access denied.');
      }
    }
  },
  'Attachments.update': function (selector, modifier) {
    if (this.userId) {
      if (Roles.userIsInRole(this.userId, Meteor.settings.allow.Attachments.update)) {
        Attachments.update(selector, modifier);
      } else {
        console.log('Attachments.update: access denied.');
      }
    }
  }
});
