Template.newsAndEventsPage.helpers({
  imageExists: function () {
    return NewsEvents.findOne({coverImageId: { $exists: true } });
  }
});