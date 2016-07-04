attachmentIdVar = new ReactiveVar(false);

Tracker.autorun(function () {
  console.log("The choice is: " + Session.get("outletChoice"));
  console.log("attachmentIdVar: " + attachmentIdVar.get());
});

Template.adminPublications.onCreated(function() {
  Session.set('inputsAuthors', []); // on page load, no inputs
  Session.set('inputsEditors', []); // on page load, no inputs
  Session.setDefault("outletChoice","");
});

Template.adminPublications.onRendered(function() {
  $(document).ready(function() {
    $('#abstract').summernote({
    	height: 200,
    	toolbar: [
    	    // [groupName, [list of button]]
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


Template.adminPublications.helpers({
	ppSelected: function () {
		if (Session.get("outletChoice") === "pp") {
			return true;
		};
	},
	bkSelected: function () {
		if (Session.get("outletChoice") === "bk") {
			return true;
		};
	},
	bcSelected: function () {
		if (Session.get("outletChoice") === "bc") {
			return true;
		};
	},
	inputsAuthors: function () {
    return Session.get('inputsAuthors');
  },
  inputsEditors: function () {
    return Session.get('inputsEditors');
  }
});

Template.adminPublications.events({
	'change .js-radios': function (evt, temp) {
		evt.preventDefault();
		if ($('input[name=outlet-type]:checked').val() === "wp") {
			Session.set("outletChoice", "wp");
		} else if ($('input[name=outlet-type]:checked').val() === "pp") {
			Session.set("outletChoice", "pp");
		} else if ($('input[name=outlet-type]:checked').val() === "bk") {
			Session.set("outletChoice", "bk");
		} else if ($('input[name=outlet-type]:checked').val() === "bc") {
			Session.set("outletChoice", "bc");
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

    if (Session.get("outletChoice") === "pp") {
      selectedOutlet = "Published Paper";
    }
    else if (Session.get("outletChoice") === "bk") {
      selectedOutlet = "Book";
    }
    else if (Session.get("outletChoice") === "bc") {
      selectedOutlet = "Book Chapter";
    }
    else {
      selectedOutlet = "Working Paper";
    }

    // temp necessary for attachments
    var temp = {};
    if (attachmentIdVar.get()) {
      temp.attachmentId = attachmentIdVar.get();
    }
	//Authors
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
	    newAuthors = [];
		newAuthorsFullName = [];
	    for (i = 0; i < updatedAuthors.length; i++) {
                if(updatedAuthors[i].firstName && updatedAuthors[i].lastName){
					newAuthors[newAuthors.length] = updatedAuthors[i];
					newAuthorsFullName[newAuthorsFullName.length] = updatedAuthors[i].fullName;
				}
        }
		//Check the authors to add
        console.log('Authors');
		for (i = 0; i < newAuthors.length; i++) {
               console.log(newAuthors[i].fullName)
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
		newEditors = [];
		newEditorsFullName = [];
	    for (i = 0; i < updatedEditors.length; i++) {
                if(updatedEditors[i].firstName && updatedEditors[i].firstName){
					newEditors[newEditors.length] = updatedEditors[i];
					newEditorsFullName[newEditorsFullName.length] = updatedEditors[i].fullName;
				}
        }
		//Check the editors to add
        console.log('editors');
		for (i = 0; i < newEditors.length; i++) {
               console.log(newEditors[i].fullName)
        };

    Meteor.call('NewsEvents.insert', {
      title: "A New Publication Added to Bibliography",
      description: "The publication \"" + $('#title').val() + "\" was added to the bibliography. ",
      cleanDescription: "The publication \"" + $('#title').val() + "\" was added to the bibliography. ",
      type: "news",
      createdAt: moment().format('ddd, DD MMM YYYY hh:mm:ss'),
      publishedAt: moment().format('ddd, DD MMM YYYY hh:mm:ss'),
      publishedRawFormat: new Date(),
      keywords: ["publication"]
    });

		Meteor.call('Publications.insert', {
			title: $('#title').val(),
			//authors: [$('#authors').val()],
      fullNameAuthors: newAuthorsFullName,
			authors: newAuthors,
      fullNameEditors: newEditorsFullName,
			editors: newEditors,
			year: $('#year').val(),
      link: $('#link').val(),
			type: $('input[name=outlet-type]:checked').val(),
			abstract: $('#abstract').summernote('code'),
      cleanAbstract: $('#abstract').summernote('code').replace(/<\/?[^>]+(>|$)/g, ""),
      outlet: selectedOutlet,

			// Published Paper (pp)
			journal: $('#journal').val(),
			// Published Paper (pp) or Book Chapter (bc)
			pages: $('#pages').val(),

			// Book (bk) or Book Chapter (bc)
			publisher: $('#publisher').val(),
			location: $('#location').val(),

      attachmentId: temp.attachmentId,
			createdAt: new Date ()
		});
        //Fire the email to all subscriptors
		var publication = '<header><img src="http://openstrategynetwork.com/img/osn_logoneu.png"></header><body style="background:#0B676E;color:#FFFFFF"><center>' +'<h1>New publication uploaded to our platform!</h1>'+ '<h2>Title: '+$('#title').val()+'</h2>' + '<h2>Abstract:</h2>'+'<h3>'+$('#abstract').summernote('code')+'</h3></center></body>';
            for (i = 0; i < Subscribers.find().count(); i++) {
            var email_ = Subscribers.find().fetch()[i].email;
	            Meteor.call('sendEmail',
	                         email_, //To
                            'Open Strategy Network <violetta.splitter@business.uzh.ch>', //from
                            'New publication in Open Strategy Network', //subject
                             publication+'<footer style="background:#CCCCCC;color:black;"><center><h4>To unsubscribe to our notifications go to <a href='+Meteor.absoluteUrl()+'unsubscribe?='+email_+'>http://openstrategynetwork.com/unsubscribe</a></h4><center></footer>');
            }

		$('#addPub')[0].reset();
		$('#abstract').summernote('code', '');

		// $('#title').val('');
		// $('#authors').val('');
		// $('#year').val('');
		// $('#abstract').val('');
		// $("input:radio").removeAttr("checked");

		Bert.alert("Publication added to bibliography.");
    // set reactive vars back to false otherwise static files might be overwritten
    attachmentIdVar.set(false);
	}
});
