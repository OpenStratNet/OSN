Template.bibliography.helpers({
  publicationData: function () {
    return Publications.find().fetch();
  }
});

Template.bibliography.helpers({
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