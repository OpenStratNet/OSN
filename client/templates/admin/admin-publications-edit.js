outletChoice = new ReactiveVar(false);

Tracker.autorun(function () {
  console.log("The choice-edit is: " + outletChoice.curValue);
  console.log("The choice Session Edit is: " + Session.get("outletChoiceEdit"));
});

Template.adminPublicationsEdit.onCreated(function() {
  Session.set('inputsAuthors', []); // on page load, no inputs
  Session.set('inputsEditors', []); // on page load, no inputs
  Session.set('inputsExistingAuthors', []);
  Session.setDefault("outletChoiceEdit","");
});

Template.adminPublicationsEdit.onRendered(function() {
  $(document).ready(function() {
    $('#abstract').summernote({
      height: 200, 
      toolbar: [
      //[groupName, [list of button]]
      ['style', ['style']],
        ['font', ['bold', 'italic', 'underline', 'clear']],
        ['fontname', ['fontname']],
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['height', ['height']],
        ['table', ['table']],
        ['insert', ['link', 'hr']], // 'picture', is tooked out
        ['view', ['fullscreen', 'codeview']],
        ['help', ['help']]
      ]
    });
  });
});

Template.adminPublicationsEdit.helpers({
  pubEntry: function () {
    pubEntryComplete = Publications.findOne({_id: this._id});
    existingAuthors = [];
    for (var i = 0; i < pubEntryComplete.authors.length; i++) { 
      existingAuthors.push({uniqidFirst: Math.ceil(Math.random() * 100000), valueFirst: pubEntryComplete.authors[i].firstName, uniqidLast: Math.ceil(Math.random() * 100000), valueLast: pubEntryComplete.authors[i].lastName});
    }

    // _.each(existingAuthors, function(input) { 
    //   newAuthors.push({firstName: $('#' + input.uniqidFirst).val(), lastName: $('#' + input.uniqidLast).val()});
    // });
    Session.set("inputsExistingAuthors", existingAuthors);

    // return whole Publication in general
    return Publications.findOne({_id: this._id});
  },
  imageExists: function () {
    return Publications.findOne({coverImageId: { $exists: true } });
  },
  attachmentExists: function () {
    return Publications.findOne({attachmentId: { $exists: true } });
  },
  isChecked: function(val) {
    return (this.type === val) ? "checked" : "";
  },
  // ppSelected: function () {
  //   if (outletChoice.curValue === "pp") {
  //     return true;
  //   };
  // },
  // bkSelected: function () {
  //   if (outletChoice.curValue  === "bk") {
  //     return true;
  //   };
  // },
  // bcSelected: function () {
  //   if (outletChoice.curValue  === "bc") {
  //     return true;
  //   };
  // },
  ppSelected: function () {
    if (Session.get("outletChoiceEdit") === "pp") {
      return true;
    };
  },
  bkSelected: function () {
    if (Session.get("outletChoiceEdit") === "bk") {
      return true;
    };
  },
  bcSelected: function () {
    if (Session.get("outletChoiceEdit") === "bc") {
      return true;
    };
  },
  inputsAuthors: function () {
    return Session.get('inputsAuthors');
  },
  inputsExistingAuthors: function () {
    return Session.get('inputsExistingAuthors');
  },
  inputsEditors: function () {
    return Session.get('inputsEditors');
  },
  randomizer: function() {
    //uniqidFirstEdit = Math.floor(Math.random() * 100000); // Give a unique ID so you can pull _this_ input when you click remove
  }
});

Template.adminPublicationsEdit.events({
  'change .js-radiosEdit': function (evt, temp) {
    evt.preventDefault();
    if ($('input[name=outlet-type]:checked').val() === "wp") {
      outletChoice.set("wp");
    } else if ($('input[name=outlet-type]:checked').val() === "pp") {
      outletChoice.set("pp");
    } else if ($('input[name=outlet-type]:checked').val() === "bk") {
      outletChoice.set("bk");
    } else if ($('input[name=outlet-type]:checked').val() === "bc") {
      outletChoice.set("bc");
    }   
    if ($('input[name=outlet-type]:checked').val() === "wp") {
      Session.set("outletChoiceEdit", "wp");
    } else if ($('input[name=outlet-type]:checked').val() === "pp") {
      Session.set("outletChoiceEdit", "pp");
    } else if ($('input[name=outlet-type]:checked').val() === "bk") {
      Session.set("outletChoiceEdit", "bk");
    } else if ($('input[name=outlet-type]:checked').val() === "bc") {
      Session.set("outletChoiceEdit", "bc");
    }   
  },
  'click #js-addAuthors': function () {
    var inputsAuthors = Session.get('inputsAuthors');
    var uniqidFirst = Math.floor(Math.random() * 100000); // Give a unique ID so you can pull _this_ input when you click remove
    var uniqidLast = Math.floor(Math.random() * 100000); 
    inputsAuthors.push({uniqidFirst: uniqidFirst, valueFirst: "", uniqidLast: uniqidLast, valueLast: ""});
    Session.set('inputsAuthors', inputsAuthors);
  },
  'click #js-addEditors': function () {
    var inputsEditors = Session.get('inputsEditors');
    var uniqidFirst = Math.ceil(Math.random() * 100000); // Give a unique ID so you can pull _this_ input when you click remove
    var uniqidLast = Math.floor(Math.random() * 100000); 
    inputsEditors.push({uniqidFirst: uniqidFirst, valueFirst: "", uniqidLast: uniqidLast, valueLast: ""});
    Session.set('inputsEditors', inputsEditors);
  },
  'submit form': function (evt, temp) {
    evt.preventDefault();
    var newAuthors = [];
    inputsAuthors = Session.get('inputsAuthors');
    _.each(inputsAuthors, function(input) { 
      newAuthors.push({firstName: $('#' + input.uniqidFirst).val(), lastName: $('#' + input.uniqidLast).val()});
    });

    var newEditors = [];
    inputsEditors = Session.get('inputsEditors');
    _.each(inputsEditors, function(input) { 
      newEditors.push({firstName: $('#' + input.uniqidFirst).val(), lastName: $('#' + input.uniqidLast).val()});
    });

    // add the existing (i.e, default) authors ro an array
    
    for (var i = 0; i < pubEntryComplete.authors.length; i++) {
      newAuthors.unshift({firstName: existingAuthors[i]["uniqidFirst"], lastName: existingAuthors[i]["uniqidLast"]}); 
    };
    // newAuthors.unshift({firstName: $('#firstAuName').val(), lastName: $('#lastAuName').val()}); 
    newEditors.unshift({firstName: $('#firstEdName').val(), lastName: $('#lastEdName').val()}); 

    var temp = {};
    temp.title = $('#title').val()
    temp.authors = newAuthors,
    temp.editors = newEditors,
    temp.year = $('#year').val(),
    temp.type = $('input[name=outlet-type]:checked').val(),
    abstract = $('#abstract').summernote('code'),

    // Published Paper (pp)
    temp.journal = $('#journal').val(),
    // Published Paper (pp) or Book Chapter (bc)
    temp.pages = $('#pages').val(),

    // Book (bk) or Book Chapter (bc)
    temp.publisher = $('#publisher').val(),
    temp.location = $('#location').val(),
    // when last time modified
    modifiedAt = new Date ()

    Publications.update({_id: this._id}, {$set: temp});

    $('#addPub')[0].reset();
    $('#abstract').summernote('code', '');

    // $('#title').val('');
    // $('#authors').val('');
    // $('#year').val('');
    // $('#abstract').val('');
    // $("input:radio").removeAttr("checked");

    console.log("done");
  }
});