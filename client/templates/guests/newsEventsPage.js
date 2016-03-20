Template.newsAndEventsPage.events({
  'click .js-back': function (evt, temp) {
    evt.preventDefault();
    Router.go('/news-and-events');
  }
});