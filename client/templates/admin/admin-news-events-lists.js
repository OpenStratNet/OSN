Template.adminNewsEventsList.helpers({
  newsEventsData: function () {
    return NewsEvents.find({}, {sort: {publishedRawFormat: -1}});
  }
});

Template.adminNewsEventsList.events({
  'click #js-delete-ne': function (evt, template) {
    evt.preventDefault();
    var deleteConfirmation = confirm('Really delete this entry?');
    if (deleteConfirmation) {
      var toBeDeletedEntry = NewsEvents.findOne({_id: this._id});
      var toBeDeletedImageId = toBeDeletedEntry.coverImageId;
      var toBeDeletedAttachmentId = toBeDeletedEntry.attachmentId;
      if (Images.find({_id: toBeDeletedImageId}).count() > 0 ) {
        Meteor.call('Images.remove', {_id: toBeDeletedImageId});
      }

      if (Attachments.find({_id: toBeDeletedAttachmentId}).count() > 0 ) {
        Meteor.call('Attachments.remove', {_id: toBeDeletedAttachmentId});
      }

      Meteor.call('NewsEvents.remove', this._id)
    }
  }
});
