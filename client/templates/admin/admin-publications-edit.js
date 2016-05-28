outletChoice = new ReactiveVar(false);
attachmentIdVar = new ReactiveVar(false);

Tracker.autorun(function () {
  console.log("The choice-edit is: " + outletChoice.curValue);
  console.log("The choice Session Edit is: " + Session.get("outletChoiceEdit"));
  console.log("inputsExistingAuthors: " + Session.get("inputsExistingAuthors"));
  console.log("inputsAuthors: " + Session.get("inputsAuthors"));
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
    }
  },
  bkSelected: function () {
    if (Session.get("outletChoiceEdit") === "bk") {
      return true;
    }
  },
  bcSelected: function () {
    if (Session.get("outletChoiceEdit") === "bc") {
      return true;
    }
  },
  inputsAuthors: function () {
    return Session.get('inputsAuthors');
  },
  inputsExistingAuthors: function () {
    console.log(Session.get('inputsExistingAuthors'));
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
  'change #attachment': function(event, temp) {
    var attachment = event.target.files[0];

    // Insert the image into the database
    // getting the image ID for use in the course object
    var attachmentObject = Attachments.insert(attachment);

    // The image id is stored in the image object
    var attachmentId = attachmentObject._id;

    // Create a reactive var to be used when the course is added
    if (attachmentId) {
      attachmentIdVar = new ReactiveVar(attachmentId);
    }
  },
  'submit form': function (evt, temp) {
    evt.preventDefault();

    // store outlet option for adding into the DB
    var selectedOutlet = "";

    if (Session.get("outletChoiceEdit") === "pp") {
      selectedOutlet = "Published Paper";
    }
    else if (Session.get("outletChoiceEdit") === "bk") {
      selectedOutlet = "Book";
    }
    else if (Session.get("outletChoiceEdit") === "bc") {
      selectedOutlet = "Book Chapter";
    } 
    else {
      selectedOutlet = "Working Paper";
    }

    //var newAuthors = [];
    //inputsAuthors = Session.get('inputsAuthors');

    // each input feld mit name=authors
    // firstName und lastName in allAuthors
    //temp.authors = allAuthors

    //_.each(inputsAuthors, function(input) {
    //  newAuthors.push({firstName: $('#' + input.uniqidFirst).val(), lastName: $('#' + input.uniqidLast).val()});
    //});

    //var newEditors = [];
   // inputsEditors = Session.get('inputsEditors');
    //_.each(inputsEditors, function(input) {
    //  newEditors.push({firstName: $('#' + input.uniqidFirst).val(), lastName: $('#' + input.uniqidLast).val()});
    //});

    // add the existing (i.e, default) authors ro an array

    //*for (var i = 0; i < pubEntryComplete.authors.length; i++) {
    //  newAuthors.unshift({firstName: existingAuthors[i]["valueFirst"], lastName: existingAuthors[i]["valueLast"]}); //
    //};
    
    // newAuthors.unshift({firstName: $('#firstAuName').val(), lastName: $('#lastAuName').val()});
    //newEditors.unshift({firstName: $('#firstEdName').val(), lastName: $('#lastEdName').val()});
	
	//Implemented solution for the AUTHORS field
	//Create empty array for the update.
	updatedAuthors = [];
	//Create empty array for the first name.
	authorFN = [];
	//Create empty array for the last name.
	authorLN = [];
	//Lenght of the css class author-first-n.
	numberOfAuthors =$('.author-first-n').length;
	//function that construct the updatedAuthors array
	    for (i = 0; i < numberOfAuthors; i++) { 
            var author_firstName = $('.author-first-n')[i]; //Get the input info for the DOM
			var author_lastName = $('.author-last-n')[i]    //Get the input info for the DOM
			    authorFN[i] =author_firstName.value;        //Get the value of the input, prefilled, modified or created
				authorLN[i] =author_lastName.value;         //Get the value of the input, prefilled, modified or created
				updatedAuthors[i] = {"lastName" : authorLN[i], //.lastName
				                     "firstName" : authorFN[i] //.firstName
                                    };
        }
        console.log('authors');
		console.log(updatedAuthors);                        //Check the authors to add
	
	//Implemented solution for the EDITORS field
	//Create empty array for the update.
	updatedEditors = [];
	//Create empty array for the first name.
	editorFN = [];
	//Create empty array for the last name.
	editorLN = [];
	//Lenght of the css class editor-first-n.
	numberOfEditors =$('.editors-first-n').length;
	//function that construct the numberOfEditors array
	    for (i = 0; i < numberOfEditors; i++) { 
            var editor_firstName = $('.editors-first-n')[i]; //Get the input info for the DOM
			var editor_lastName = $('.editors-last-n')[i]    //Get the input info for the DOM
			    editorFN[i] =editor_firstName.value;        //Get the value of the input, prefilled, modified or created
				editorLN[i] =editor_lastName.value;         //Get the value of the input, prefilled, modified or created
				updatedEditors[i] = {"lastName" : editorLN[i], //.lastName
				                     "firstName" : editorFN[i] //.firstName
                                    };
        }
        console.log('editors');
		console.log(updatedEditors);                        //Check the editors to add
    
	
	var temp = {};

    temp.title = $('#title').val();
    temp.authors = updatedAuthors,
    temp.editors = updatedEditors,
    temp.year = $('#year').val(),
    temp.type = $('input[name=outlet-type]:checked').val(),
    temp.link = $('#link').val(),
    temp.abstract = $('#abstract').summernote('code'),
    temp.outlet = selectedOutlet,

    // Published Paper (pp)
    temp.journal = $('#journal').val(),
    // Published Paper (pp) or Book Chapter (bc)
    temp.pages = $('#pages').val(),

    // Book (bk) or Book Chapter (bc)
    temp.publisher = $('#publisher').val(),
    temp.location = $('#location').val(),

    // when last time modified
    temp.modifiedAt = new Date ();

    if (attachmentIdVar.get()) {
      temp.attachmentId = attachmentIdVar.get();
    }
    Meteor.call('Publications.update', {_id: this._id}, {$set: temp});

    // $('#addPub')[0].reset();
    // $('#abstract').summernote('code', '');

    Session.set("inputsAuthors", []);
    // $('#title').val('');
    // $('#authors').val('');
    // $('#year').val('');
    // $('#abstract').val('');
    // $("input:radio").removeAttr("checked");

    Bert.alert("Changes saved");
  }
});
