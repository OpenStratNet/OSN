Template.bibliographyPage.events({
  'click .js-back': function (evt, temp) {
    evt.preventDefault();
    Router.go('/bibliography');
  }
});

Template.bibliographyPage.helpers({
  isWP: function() {
    var pubEntry = Publications.findOne({_id: this._id});
    if (pubEntry.type === "wp") {
      return true
    } else {
      return false
    }
  },
  isBC: function() {
    var pubEntry = Publications.findOne({_id: this._id});
    if (pubEntry.type === "bc") {
      return true
    } else {
      return false
    }
  },
  isPP: function() {
    var pubEntry = Publications.findOne({_id: this._id});
    if (pubEntry.type === "pp") {
      return true
    } else {
      return false
    }
  },
  isBK: function() {
    var pubEntry = Publications.findOne({_id: this._id});
    if (pubEntry.type === "bk") {
      return true
    } else {
      return false
    }
  }
});
