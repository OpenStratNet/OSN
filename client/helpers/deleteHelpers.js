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

      var toBeDeletedEmail = toBeDeletedUser.profile.email;
      if (Subscribers.find({email: toBeDeletedEmail}).count() > 0 ) {
        Meteor.call('Subscribers.remove', {_id: Subscribers.findOne({email: toBeDeletedEmail})._id});
      }

      var toBeDeletedProfilePicURL = toBeDeletedUser.profile.pictureID;
      console.log(toBeDeletedProfilePicURL);
      if (typeof toBeDeletedProfilePicURL !== 'undefined') {
        console.log("ID here");
        if (Meteor.users.find({"profile.pictureID": toBeDeletedProfilePicURL}).count() > 0 ) {
          var toBeDeletedProfilePic = toBeDeletedProfilePicURL.substring(toBeDeletedProfilePicURL.lastIndexOf("/")+1);
          Meteor.call('ProfilePic.remove', {_id: toBeDeletedProfilePic});
          console.log(toBeDeletedProfilePic);
          console.log("good");
        } else {
          console.log("nothing");
        }
      } else {
        console.log("undefined");
      }
      Meteor.users.remove({_id: this._id});
    }
  }
});
