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

Images = new FS.Collection("images", {
  stores: [new FS.Store.FileSystem("images", {path: "~/uploads"})]
});

Attachments = new FS.Collection("attachments", {
  stores: [new FS.Store.FileSystem("attachments", {path: "~/uploads"})]
});

// Allow rules
Images.allow({
  insert: function() { return true; },
  update: function() { return true; }
});

// Allow rules
Attachments.allow({
  insert: function() { return true; },
  update: function() { return true; }
});

PublicationsIndex = new EasySearch.Index({
  collection: Publications,
  fields: ['authors.firstName', 'authors.lastName', 'title', 'outlet', 'year', 'abstract'],
  engine: new EasySearch.Minimongo(),
});