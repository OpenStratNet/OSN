UI.registerHelper('isPP', function() {
  var pubEntry = Publications.findOne({_id: this._id});
  if (pubEntry.type === "pp") {
    return true
  } else {
    return false
  }
});

UI.registerHelper('isPP', function() {
  var pubEntry = Publications.findOne({_id: this._id});
  if (pubEntry.type === "pp") {
    return true
  } else {
    return false
  }
});

UI.registerHelper('isBK', function() {
  var pubEntry = Publications.findOne({_id: this._id});
  if (pubEntry.type === "bk") {
    return true
  } else {
    return false
  }
});

UI.registerHelper('isBC', function() {
  var pubEntry = Publications.findOne({_id: this._id});
  if (pubEntry.type === "bc") {
    return true
  } else {
    return false
  }
});

UI.registerHelper('isWP', function() {
  var pubEntry = Publications.findOne({_id: this._id});
  if (pubEntry.type === "wp") {
    return true
  } else {
    return false
  }
});
