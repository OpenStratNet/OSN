Template.applicationLayout.events({
  'click .jsNewsDelImage': function (evt, temp) {
    var deleteConfirmation = confirm('Really delete this entry?');
    if (deleteConfirmation) {
      NewsEvents.update({_id: this._id}, {$unset: {coverImageId: ""}});
      Images.remove({_id: this.coverImageId});
      imageIdVarEdit.set(false);
    }
  },
  'click .jsNewsDelAttachment': function (evt, temp) {
    var deleteConfirmation = confirm('Really delete this entry?');
    if (deleteConfirmation) {
      NewsEvents.update({_id: this._id}, {$unset: {attachmentId: ""}});
      Attachments.remove({_id: this.attachmentId});
      attachmentIdVarEdit.set(false);
    }
  },
  'click .jsPubsDelAttachment': function (evt, temp) {
    var deleteConfirmation = confirm('Really delete this entry?');
    if (deleteConfirmation) {
      Publications.update({_id: this._id}, {$unset: {attachmentId: ""}});
      Attachments.remove({_id: this.attachmentId});
      attachmentIdVarEdit.set(false);
    }
  },
  'click .jsMembersDelUser': function (evt, temp) {
    var deleteConfirmation = confirm('Really delete this member?');
    if (deleteConfirmation) {
      Meteor.users.remove({_id: this._id});
    }
  }
});