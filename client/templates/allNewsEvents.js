Template.allNewsEvents.helpers({
  newsEventsData: function () {
    return NewsEvents.find();
  },
  images: function () {
    return Images.find(); // Where Images is an FS.Collection instance
  }
});