Template.applicationLayout.events({
  'click .jsNewsDelImage': function (evt, temp) {
    var deleteConfirmation = confirm('Really delete the image?');
    if (deleteConfirmation) {
      Meteor.call('NewsEvents.update', {_id: this._id}, {$unset: {coverImageId: ""}});
      Meteor.call('Images.remove', {_id: this.coverImageId});
      imageIdVarEdit.set(false);
    }
  },
  'click .jsNewsDelAttachment': function (evt, temp) {
    var deleteConfirmation = confirm('Really delete the attachment?');
    if (deleteConfirmation) {
      Meteor.call('NewsEvents.update', {_id: this._id}, {$unset: {attachmentId: ""}});
      Meteor.call('Attachments.remove', {_id: this.attachmentId});
      attachmentIdVarEdit.set(false);
    }
  },
  'click .jsPubsDelAttachment': function (evt, temp) {
    var deleteConfirmation = confirm('Really delete the attachment?');
    if (deleteConfirmation) {
      Meteor.call('Publications.update', {_id: this._id}, {$unset: {attachmentId: ""}});
      Meteor.call('Attachments.remove', {_id: this.attachmentId});
      attachmentIdVarEdit.set(false);
    }
  },
  'click .jsMembersDelUser': function (evt, temp) {
    var deleteConfirmation = confirm('Really delete this member?');
    if (deleteConfirmation) {
      var toBeDeletedUser = Meteor.users.findOne({_id: this._id});
      var currentEmail = toBeDeletedUser.profile.email;
      console.log(currentEmail);
      if (Subscribers.find({email: currentEmail}).count() > 0 ) {
        Meteor.call('Subscribers.remove', {_id: Subscribers.findOne({email: currentEmail})._id});
      }
      Meteor.users.remove({_id: this._id});
    }
  }
});
