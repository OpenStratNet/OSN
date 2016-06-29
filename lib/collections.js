Publications = new Mongo.Collection("publications");

Publications.helpers({
  'attachment': function () {
    // Get the cover image from Attachments collection
    return attachment = Attachments.findOne(this.attachmentId);
  }
});

NewsEvents = new Mongo.Collection("newsevents");

NewsEvents.helpers({
  'coverImage': function () {
    // Get the cover image from Images collection
    return image = Images.findOne(this.coverImageId);
  },
  'attachment': function () {
    // Get the cover image from Attachments collection
    return attachment = Attachments.findOne(this.attachmentId);
  }
});

if (Meteor.settings && Meteor.settings.Twit) {
  var Twit = null;
  if (Meteor.settings.Twit.options) {
    Twit = new TwitMaker(Meteor.settings.Twit.options);
  }
  NewsEvents.after.insert(function (userId, doc) {
    var domain = Meteor.settings.Twit.url || 'localhost:3000';
    var url = domain + '/news-and-events/' + doc._id;
    var category = doc.category ? ' (' + doc.category + ')' : '';
    var keywords = '';
    if (doc.keywords && doc.keywords.constructor === Array) {
      for (var i = 0; i < doc.keywords.length; i++) {
        keywords += doc.keywords[i] ? ' #' + doc.keywords[i] : '';
      }
    }
    var tweet = doc.title + keywords + category + ': ' + url;
    if (Meteor.settings.Twit.test) {
      // TWITTER TEST
      console.log('Tweet:');
      console.log(tweet);
    } else if (Twit && Meteor.settings.Twit.options) {
      // TWITTER ACTIVE
      Twit.post('statuses/update', {status: tweet}, function (err, data, response) {
        if (err) {
          console.log('Twitter API error: ' + err);
        }
      });
    } else {
      console.log('No Twitter API Credentials, skip :(');
    }
  });
}

// Tags and Categories
Tags = new Mongo.Collection('tags');
Categories = new Mongo.Collection('categories');

// helper function to show the profile pic (might not be used anymore, check!)
Meteor.users.helpers({
  'uploadedPic': function () {
    // Get the cover image from ProfilePic collection
    return uploadedPic = ProfilePic.findOne(this.profile.pictureID);
  }
});

Meteor.users.allow({
  remove: function (userId, doc) {
    // JUST FOR TESTING - NEVER DO THIS IN PRODUCTION
    return true;
  }
});

if (Meteor.settings && Meteor.settings.development) {
//  *** LOCAL ***
  Images = new FS.Collection("images", {
    stores: [new FS.Store.FileSystem("images", {path: "~/uploads"})]
  });

  Attachments = new FS.Collection("attachments", {
    stores: [new FS.Store.FileSystem("attachments", {path: "~/uploads"})]
  });

  ProfilePic = new FS.Collection("profilePic", {
    stores: [new FS.Store.FileSystem("profilePic", {path: "~/uploads"})]
  });
} else {
// *** PRODUCTION ***

  if (Meteor.isServer) {
    var imageStore = new FS.Store.S3("profilePic", {
      /* REQUIRED */
      accessKeyId: Meteor.settings.AWSAccessKeyId,
      secretAccessKey: Meteor.settings.AWSSecretAccessKey,
      bucket: Meteor.settings.AWSBucket,
      // optional ?
      region: "eu-central-1"
    });

    Images = new FS.Collection("images", {
      stores: [imageStore],
      filter: {
        allow: {
          contentTypes: ['image/*']
        }
      }
    });

    ProfilePic = new FS.Collection("profilePic", {
      stores: [imageStore],
      filter: {
        allow: {
          contentTypes: ['image/*']
        }
      }
    });

    Attachments = new FS.Collection("attachments", {
      stores: [imageStore]
    });
  }

  // On the client just create a generic FS Store as don't have
  // access (or want access) to S3 settings on client

  if (Meteor.isClient) {
    var imageStore = new FS.Store.S3("profilePic", {
      /* REQUIRED */
      accessKeyId: Meteor.settings.public.aws.AWSAccessKeyId,
      secretAccessKey: Meteor.settings.public.aws.AWSSecretAccessKey,
      bucket: Meteor.settings.public.aws.AWSBucket,
      // optional ?
      region: "eu-central-1"
    });

    ProfilePic = new FS.Collection("profilePic", {
      stores: [imageStore],
      filter: {
        allow: {
          contentTypes: ['image/*']
        },
        onInvalid: function (message) {
          Bert.alert("Only image formats such as .jpg and .png allowed.");
        }
      }
    });

    Images = new FS.Collection("images", {
      stores: [imageStore],
      filter: {
        allow: {
          contentTypes: ['image/*']
        },
        onInvalid: function (message) {
          Bert.alert("Only image formats such as .jpg and .png allowed.");
        }
      }
    });

    Attachments = new FS.Collection("attachments", {
      stores: [imageStore]
    });
  }
}

if (Meteor.isServer) {
// Allow rules
  Images.allow({
    insert: function () {
      return true;
    },
    update: function () {
      return true;
    },
    remove: function (userId) {
      if (userId) {
        if (Roles.userIsInRole(userId, Meteor.settings.allow.Images.remove)) {
          return true;
        }
      }
      return false;
    },
    download: function () {
      return true;
    }
  });

  Attachments.allow({
    insert: function () {
      return true;
    },
    update: function () {
      return true;
    },
    remove: function (userId) {
      if (userId) {
        if (Roles.userIsInRole(userId, Meteor.settings.allow.Attachments.remove)) {
          return true;
        }
      }
      return false;
    },
    download: function () {
      return true;
    }
  });

  ProfilePic.allow({
    insert: function () {
      return true;
    },
    update: function () {
      return true;
    },
    remove: function (userId) {
      if (userId) {
        if (Roles.userIsInRole(userId, Meteor.settings.allow.ProfilePic.remove)) {
          return true;
        }
      }
      return false;
    },
    download: function () {
      return true;
    }
  });
}

// Search initialization
PublicationsIndex = new EasySearch.Index({
  collection: Publications,
  fields: ['authors.firstName', 'authors.lastName', 'authors.fullName', 'title', 'outlet', 'year', 'abstract', 'editors.firstName', 'editors.lastName', 'editors.fullName'],
  engine: new EasySearch.Minimongo()
});

MembersIndex = new EasySearch.Index({
  collection: Meteor.users,
  fields: ['profile.firstName', 'profile.lastName', 'profile.fullName', 'profile.institution', 'profile.position', 'profile.interests', 'profile.email'],
  engine: new EasySearch.Minimongo()
});
