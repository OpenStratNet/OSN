Template.bibliographyPage.events({
  'click .js-back': function (evt, temp) {
    evt.preventDefault();
    Router.go('/bibliography');
  }
});
