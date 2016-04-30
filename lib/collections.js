Publications = new Mongo.Collection("publications");

Publications.helpers({
  'attachment': function() {
    // Get the cover image from Attachments collection
    return attachment = Attachments.findOne(this.attachmentId);
  }
});

NewsEvents = new Mongo.Collection("newsevents");

NewsEvents.helpers({
  'coverImage': function() {
    // Get the cover image from Images collection
    return image = Images.findOne(this.coverImageId);
  },
  'attachment': function() {
    // Get the cover image from Attachments collection
    return attachment = Attachments.findOne(this.attachmentId);
  }
});

// Tags and Categories
Tags = new Mongo.Collection('tags');
Categories = new Mongo.Collection('categories');

// helper function to show the profile pic (might not be used anymore, check!)
Meteor.users.helpers({
  'uploadedPic': function() {
    // Get the cover image from ProfilePic collection
    return uploadedPic = ProfilePic.findOne(this.profile.pictureID);
  }
});

Meteor.users.allow({
  remove: function(userId, doc) {
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
    ProfilePic = new FS.Collection("profilePic", {
      stores: [new FS.Store.S3("profilePic")],
      filter: {
        allow: {
          contentTypes: ['image/*']
        },
        onInvalid: function(message) {
          Bert.alert("Only image formats such as .jpg and .png allowed.");
        }
      }
    });

    Images = new FS.Collection("images", {
      stores: [new FS.Store.FileSystem("images")],
      filter: {
        allow: {
          contentTypes: ['image/*']
        },
        onInvalid: function(message) {
          Bert.alert("Only image formats such as .jpg and .png allowed.");
        }
      }
    });

    Attachments = new FS.Collection("attachments", {
      stores: [new FS.Store.FileSystem("attachments")]
    });
  }
}

// Allow rules
Images.allow({
  insert: function() { return true; },
  update: function() { return true; },
  download: function() { return true; }
});

Attachments.allow({
  insert: function() { return true; },
  update: function() { return true; },
  download: function() { return true; }
});

ProfilePic.allow({
  insert: function() { return true; },
  update: function() { return true; },
  download: function() { return true; }
});

// Search initialization
PublicationsIndex = new EasySearch.Index({
  collection: Publications,
  fields: ['authors.firstName', 'authors.lastName', 'title', 'outlet', 'year', 'abstract'],
  engine: new EasySearch.Minimongo(),
});

MembersIndex = new EasySearch.Index({
  collection: Meteor.users,
  fields: ['profile.firstName', 'profile.lastName', 'profile.institution', 'profile.position', 'profile.interests', 'profile.email'],
  engine: new EasySearch.Minimongo()
});
