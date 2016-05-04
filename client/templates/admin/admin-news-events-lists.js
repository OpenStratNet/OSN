Template.adminNewsEventsList.helpers({
  newsEventsData: function () {
    return NewsEvents.find();
  },
  images: function () {
    return Images.find(); // Where Images is an FS.Collection instance
  }
});

Template.adminNewsEventsList.events({
	'click #js-delete-ne': function (evt,template) {
		evt.preventDefault();
		var deleteConfirmation = confirm('Really delete this entry?');
		if (deleteConfirmation) {
			Images.remove({_id: this.coverImageId});
			NewsEvents.remove(this._id);
		}
	}
});