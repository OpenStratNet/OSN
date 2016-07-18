Template.adminPublicationsList.helpers({
  publicationsData: function () {
    return Publications.find({}, {sort: {"title": 1}});
  }
});

Template.adminPublicationsList.events({
  'click .js-delete-pub': function (evt, template) {
    evt.preventDefault();
    var deleteConfirmation = confirm('Really delete this entry?');
    if (deleteConfirmation) {
      var toBeDeletedEntry = Publications.findOne({_id: this._id});
      var toBeDeletedAttachmentId = toBeDeletedEntry.attachmentId;
      if (Attachments.find({_id: toBeDeletedAttachmentId}).count() > 0 ) {
        Meteor.call('Attachments.remove', {_id: toBeDeletedAttachmentId});
      }

      Meteor.call('Publications.remove', this._id);
    }
  }
});
