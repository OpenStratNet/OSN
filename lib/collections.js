Publications = new Mongo.Collection("publications");

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

Meteor.users.helpers({
  'uploadedPic': function() {
    // Get the cover image from Attachments collection
    return uploadedPic = ProfilePic.findOne(this.profile.pictureID);
  }
});

// local
Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images", {path: "~/uploads"})]
});

Attachments = new FS.Collection("attachments", {
  stores: [new FS.Store.FileSystem("attachments", {path: "~/uploads"})]
});

ProfilePic = new FS.Collection("profilePic", {
  stores: [new FS.Store.FileSystem("profilePic", {path: "~/uploads"})]
});

// production
// Images = new FS.Collection("images", {
//   stores: [new FS.Store.FileSystem("images")]
// });

// Attachments = new FS.Collection("attachments", {
//   stores: [new FS.Store.FileSystem("attachments")]
// });

// Allow rules
Images.allow({
  insert: function() { return true; },
  update: function() { return true; }
});

Attachments.allow({
  insert: function() { return true; },
  update: function() { return true; }
});

ProfilePic.allow({
  insert: function() { return true; },
  update: function() { return true; }
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