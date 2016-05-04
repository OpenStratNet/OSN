Template.adminPublicationsList.helpers({
  publicationsData: function () {
    return Publications.find();
  }
  // images: function () {
  //   return Images.find(); // Where Images is an FS.Collection instance
  // }
});

Template.adminPublicationsList.events({
  'click #js-delete-ne': function (evt, template) {
    evt.preventDefault();
    var deleteConfirmation = confirm('Really delete this entry?');
    if (deleteConfirmation) {
      //Images.remove({_id: this.coverImageId});
      Meteor.call('Publications.remove', this._id);
    }
  }
});