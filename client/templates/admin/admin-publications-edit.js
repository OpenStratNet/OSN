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
  Session.set('inputsExistingEditors', []);
  Session.setDefault("outletChoiceEdit","");
  Session.set('template', $('#template').html()); //Set the html in a session variable
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

    //editors are only relevant for book chapters
    if (pubEntryComplete.editors.length > 0) {
      existingEditors = []
      for (var i = 0; i < pubEntryComplete.editors.length; i++) {
        existingEditors.push({uniqidFirst: Math.ceil(Math.random() * 100000), valueFirst: pubEntryComplete.editors[i].firstName, uniqidLast: Math.ceil(Math.random() * 100000), valueLast: pubEntryComplete.editors[i].lastName});
      }
    }

    Session.set("inputsExistingAuthors", existingAuthors);
    Session.set("inputsExistingEditors", existingEditors);
    // return whole Publication in general
    return Publications.findOne({_id: this._id});
  },
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
  inputsExistingEditors: function () {
    console.log(Session.get('inputsExistingEditors'));
    return Session.get('inputsExistingEditors');
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
	updatedAuthors = [];
    //updatedAuthorsFullName = [];
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
				authorLN[i] =author_lastName.value; 				//Get the value of the input, prefilled, modified or created
				updatedAuthors[i] = {"lastName" : authorLN[i], //.lastName
				                     "firstName" : authorFN[i], //.firstName
                                     "fullName" : authorFN[i] + ' ' + authorLN[i] //Full name
									 };
        }
    //Purgue the array of empty fields
	    updatedAuthorsFixed = [];
		updatedAuthorsFullName = [];
	    for (i = 0; i < updatedAuthors.length; i++) {
                if(updatedAuthors[i].firstName && updatedAuthors[i].lastName){
					updatedAuthorsFixed[updatedAuthorsFixed.length] = updatedAuthors[i];
					updatedAuthorsFullName[updatedAuthorsFullName.length] = updatedAuthors[i].fullName;
				}
        }
		//Check the authors to add
        console.log('Authors');
		for (i = 0; i < updatedAuthorsFixed.length; i++) {
               console.log(updatedAuthorsFixed[i].fullName)
        };
	//Implemented solution for the EDITORS field
	//Create empty array for the update.
	updatedEditors = [];
    //updatedEditorsFullName = [];
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
				                     "firstName" : editorFN[i], //.firstName
                                     "fullName" : editorFN[i] + ' ' + editorLN[i]
									 };
        }
    //Purgue the array of empty fields
		updatedEditorsFixed = [];
		updatedEditorsFullName = [];
	    for (i = 0; i < updatedEditors.length; i++) {
                if(updatedEditors[i].firstName && updatedEditors[i].firstName){
					updatedEditorsFixed[updatedEditorsFixed.length] = updatedEditors[i];
					updatedEditorsFullName[updatedEditorsFullName.length] = updatedEditors[i].fullName;
				}
        }
		//Check the editors to add
        console.log('editors');
		for (i = 0; i < updatedEditorsFixed.length; i++) {
               console.log(updatedEditorsFixed[i].fullName)
        };
	var temp = {};

    temp.title = $('#title').val();
    temp.authors = updatedAuthorsFixed;
    temp.fullNameAuthors = updatedAuthorsFullName;
    temp.editors = updatedEditorsFixed;
	temp.fullNameEditors = updatedEditorsFullName;
    temp.year = $('#year').val();
    temp.type = $('input[name=outlet-type]:checked').val();
    temp.link = $('#link').val();
    temp.abstract = $('#abstract').summernote('code');
    temp.cleanAbstract = $('#abstract').summernote('code').replace(/<\/?[^>]+(>|$)/g, "");
    temp.outlet = selectedOutlet;

    // Published Paper (pp)
    temp.journal = $('#journal').val();
    // Published Paper (pp) or Book Chapter (bc)
    temp.pages = $('#pages').val();

    // Book (bk) or Book Chapter (bc)
    temp.publisher = $('#publisher').val();
    temp.location = $('#location').val();

    // when last time modified
    temp.modifiedAt = new Date ();

    if (attachmentIdVar.get()) {
      temp.attachmentId = attachmentIdVar.get();
    }
    Meteor.call('Publications.update', {_id: this._id}, {$set: temp});

    Session.set("inputsAuthors", []); //Reset inputs
	Session.set("inputsEditors", []); //Reset inputs
    $('#template').html(Session.get('template')); //Force to re-render the template
    //Bert alert
    Bert.alert("Changes saved");
  }
});
