Template.adminNewsEventsList.helpers({
  newsEventsData: function () {
    return NewsEvents.find();
  }
});

Template.adminNewsEventsList.events({
  'click #js-delete-ne': function (evt, template) {
    evt.preventDefault();
    var deleteConfirmation = confirm('Really delete this entry?');
    if (deleteConfirmation) {
      Meteor.call('Images.remove', {_id: this.coverImageId});
      Meteor.call('NewsEvents.remove', this._id)
    }
  }
});
