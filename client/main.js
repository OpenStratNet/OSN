Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Template.publicationList.helpers({
  publicationData: function () {
    return Publications.find().fetch();
  }
});

Template.searchBox.helpers({
  atts: function() {
    return {placeholder: "Search for authors, title, abstract here ..."};
  },
  publicationsIndex: function() {
    return PublicationsIndex;
  },
  publicationData: function () {
    return Publications.find().fetch();
  } 
});
